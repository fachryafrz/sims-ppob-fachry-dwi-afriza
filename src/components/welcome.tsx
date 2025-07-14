"use client";

import axios from "axios";
import useSWR from "swr";
import Skeleton from "./skeleton";

export default function Welcome() {
  const { data } = useSWR("/api/profile", async (url) => {
    return await axios.get(url).then(({ data }) => data.data);
  });

  return (
    <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
      {/* Image */}
      {data ? (
        data.profile_image?.split("/").pop() === "null" ? (
          <img
            src={"/assets/Profile Photo.png"}
            alt=""
            draggable={false}
            className="aspect-square w-20 rounded-full border border-gray-400/50 object-cover"
          />
        ) : (
          <img
            src={data.profile_image}
            alt=""
            draggable={false}
            className="aspect-square w-20 rounded-full border border-gray-400/50 object-cover"
          />
        )
      ) : (
        <Skeleton className="aspect-square w-20 rounded-full" />
      )}

      <div>
        <span className="text-lg">Selamat datang,</span>
        {data ? (
          <h1 className="text-3xl font-medium">{`${data.first_name} ${data.last_name}`}</h1>
        ) : (
          <Skeleton className="h-9 w-40" />
        )}
      </div>
    </div>
  );
}
