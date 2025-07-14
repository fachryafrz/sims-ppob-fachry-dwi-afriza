"use client";

import { BannerType } from "@/lib/types";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";

import "swiper/css";
import Skeleton from "./skeleton";

export default function Banner() {
  const { data } = useSWR(
    "/api/banner",
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
    <div className="space-y-4">
      <h2 className="px-4 font-medium xl:px-24">Temukan promo menarik</h2>

      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        className="!px-4 !pr-12 xl:!px-24"
      >
        {data
          ? data.map((banner: BannerType, index: number) => (
              <SwiperSlide key={index}>
                <img
                  src={banner.banner_image}
                  alt=""
                  draggable={false}
                  className="w-full"
                />
              </SwiperSlide>
            ))
          : [...Array(5)].map((_, index) => (
              <SwiperSlide key={index}>
                <Skeleton className="aspect-[20/9] w-full rounded-lg" />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}
