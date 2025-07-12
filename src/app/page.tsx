"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export default function Home() {
  const router = useRouter();

  const { data, error, isLoading } = useSWR("/api/profile", async (url) => {
    return await axios.get(url).then(({ data }) => data.data);
  });

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const handleLogout = async () => {
    await axios.post("/api/logout");

    router.refresh();
  };

  return (
    <div className="flex flex-col gap-2">
      <span>{data.email}</span>
      <span>
        {data.first_name} {data.last_name}
      </span>
      <img src={data.profile_image} alt="" className="w-10" draggable={false} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
