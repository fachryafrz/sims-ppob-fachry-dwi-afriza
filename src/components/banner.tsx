"use client";

import { BannerType } from "@/lib/types";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";

import "swiper/css";

export default function Banner() {
  const { data, error, isLoading } = useSWR("/api/banner", async (url) => {
    return await axios.get(url).then(({ data }) => data.data);
  });

  if (error) return <div className="px-24">failed to load</div>;
  if (isLoading) return <div className="px-24">loading...</div>;

  return (
    <div className="space-y-4">
      <h2 className="px-24 font-medium">Temukan promo menarik</h2>

      <Swiper spaceBetween={16} slidesPerView={4} className="!px-24">
        {data.map((banner: BannerType, index: number) => (
          <SwiperSlide key={index}>
            <img
              src={banner.banner_image}
              alt=""
              draggable={false}
              className="w-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
