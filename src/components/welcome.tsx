"use client";

import axios from "axios";
import useSWR from "swr";

export default function Welcome() {
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
    <div className="space-y-4">
      {/* Image */}
      {data.profile_image?.split("/").pop() === "null" ? (
        <img src={"/assets/Profile Photo.png"} alt="" draggable={false} />
      ) : (
        <img src={data.profile_image} alt="" draggable={false} />
      )}

      <div>
        <span className="text-lg">Selamat datang,</span>
        <h1 className="text-3xl font-medium">{`${data.first_name} ${data.last_name}`}</h1>
      </div>
    </div>
  );
}
