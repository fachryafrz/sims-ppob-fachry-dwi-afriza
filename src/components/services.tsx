"use client";

import { ServicesType } from "@/lib/types";
import axios from "axios";
import Link from "next/link";
import useSWR from "swr";

export default function Services() {
  const { data, error, isLoading } = useSWR("/api/services", async (url) => {
    return await axios.get(url).then(({ data }) => data.data);
  });

  if (error) return <div className="px-24">failed to load</div>;
  if (isLoading) return <div className="px-24">loading...</div>;

  return (
    <ul className="flex justify-between px-24">
      {data.map((service: ServicesType) => (
        <li key={service.service_code}>
          <Link
            href={`/services/${service.service_code}`}
            className="flex w-full max-w-[70px] cursor-pointer flex-col items-center gap-2 text-center text-xs"
          >
            <img
              src={service.service_icon}
              alt=""
              draggable={false}
              className=""
            />

            <span>{service.service_name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
