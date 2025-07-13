"use client";

import axios from "axios";
import { Pencil } from "lucide-react";
import useSWR from "swr";

export default function ImageUpload() {
  const { data, error, isLoading } = useSWR(
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

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
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

          <input type="file" className="hidden" />
        </label>
      </div>

      {/* Name */}
      <span className="block text-3xl font-medium">{`${data.first_name} ${data.last_name}`}</span>
    </div>
  );
}
