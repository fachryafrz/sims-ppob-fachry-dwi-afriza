"use client";

import axios from "axios";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import useSWR from "swr";

export default function ImageUpload() {
  const { data } = useSWR(
    "/api/profile",
    async (url) => {
      return await axios.get(url).then(({ data }) => data.data);
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 1024 * 100) {
      toast.error("Size image yang diupload maksimum 100KB");
      return;
    }
  };

  return (
    data && (
      <div className="flex flex-col items-center gap-4">
        {/* Image */}
        <div className="relative w-[130px] rounded-full border border-gray-400/50">
          {data.profile_image?.split("/").pop() === "null" ? (
            <img
              src={"/assets/Profile Photo.png"}
              alt=""
              draggable={false}
              className="w-full"
            />
          ) : (
            <img
              src={data.profile_image}
              alt=""
              draggable={false}
              className="w-full"
            />
          )}

          <label className="absolute right-0 bottom-0 block aspect-square cursor-pointer rounded-full border border-gray-400/50 bg-white p-2">
            <Pencil size={16} />

            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>

        {/* Name */}
        <span className="block text-3xl font-medium">{`${data.first_name} ${data.last_name}`}</span>
      </div>
    )
  );
}
