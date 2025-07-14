"use client";

import axios from "axios";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import Skeleton from "../skeleton";

export default function ImageUpload() {
  const { mutate } = useSWRConfig();

  const { data } = useSWR("/api/profile", async (url) => {
    return await axios.get(url).then(({ data }) => data.data);
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 1024 * 100) {
      toast.error("Size image yang diupload maksimum 100KB");
      return;
    }

    const form = new FormData();
    form.append("file", file);

    const { data } = await axios.put("/api/profile/image", form);

    mutate("/api/profile");

    toast.success(data.message);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Image */}
      <div className="relative w-[130px]">
        {data ? (
          data.profile_image?.split("/").pop() === "null" ? (
            <img
              src={"/assets/Profile Photo.png"}
              alt=""
              draggable={false}
              className="aspect-square w-full rounded-full border border-gray-400/50 object-cover"
            />
          ) : (
            <img
              src={data.profile_image}
              alt=""
              draggable={false}
              className="aspect-square w-full rounded-full border border-gray-400/50 object-cover"
            />
          )
        ) : (
          <Skeleton className="aspect-square w-full rounded-full" />
        )}

        <label className="absolute right-0 bottom-0 block aspect-square cursor-pointer rounded-full border border-gray-400/50 bg-white p-2">
          <Pencil size={16} />

          <input
            type="file"
            className="hidden"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* Name */}
      {data ? (
        <span className="block text-3xl font-medium">{`${data.first_name} ${data.last_name}`}</span>
      ) : (
        <Skeleton className="h-9 w-40" />
      )}
    </div>
  );
}
