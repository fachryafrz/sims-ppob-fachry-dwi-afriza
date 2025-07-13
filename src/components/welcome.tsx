"use client";

import axios from "axios";
import useSWR from "swr";

export default function Welcome() {
  const { data } = useSWR("/api/profile", async (url) => {
    return await axios.get(url).then(({ data }) => data.data);
  });

  return (
    data && (
      <div className="space-y-4">
        {/* Image */}
        {data.profile_image?.split("/").pop() === "null" ? (
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
        )}

        <div>
          <span className="text-lg">Selamat datang,</span>
          <h1 className="text-3xl font-medium">{`${data.first_name} ${data.last_name}`}</h1>
        </div>
      </div>
    )
  );
}
