"use client";

import { ServicesType } from "@/lib/types";
import axios from "axios";
import Link from "next/link";
import useSWR from "swr";
import Skeleton from "./skeleton";

export default function Services() {
  const { data } = useSWR(
    "/api/services",
    async (url) => {
      return await axios.get(url).then(({ data }) => data.data);
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return (
    <ul className="grid grid-cols-3 gap-4 px-4 md:grid-cols-6 xl:flex xl:justify-between xl:px-24">
      {data
        ? data.map((service: ServicesType) => (
            <li key={service.service_code} className="flex justify-center">
              <Link
                href={`/services/${service.service_code}`}
                className="flex w-full cursor-pointer flex-col items-center gap-2 text-center text-xs xl:max-w-[70px]"
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
          ))
        : [...Array(12)].map((_, index) => (
            <li key={index} className="flex justify-center">
              <div className="flex w-[70px] flex-col items-center gap-2">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="aspect-square h-4 w-12" />
              </div>
            </li>
          ))}
    </ul>
  );
}
