"use client";

import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import dayjs from "dayjs";
import "dayjs/locale/id";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.locale("id");
dayjs.extend(utc);
dayjs.extend(timezone);

export default function ListOfTransactions() {
  const limit = 5;
  const offset = 0;
  const [showMore, setShowMore] = useState(true);

  const { data, error, isLoading, mutate } = useSWR(
    "/api/transaction/history",
    async (url) => {
      return await axios
        .get(url, {
          params: { offset, limit },
        })
        .then(({ data }) => data.data);
    },
    {
      revalidateOnFocus: false,
    },
  );

  // Hanya memanggil data 5 kali per halaman agar lebih cepat
  const fetchMore = async () => {
    const nextPage = data.records.length;

    const { data: newData } = await axios.get("/api/transaction/history", {
      params: { offset: nextPage, limit },
    });

    if (newData.data.records.length < limit) setShowMore(false);

    mutate(
      {
        ...data,
        records: [...data.records, ...newData.data.records],
      },
      false,
    );
  };

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  console.log(data);

  return (
    <div className="space-y-4">
      {data.records.map((t: TransactionType, index: number) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-lg border border-gray-400 p-4"
        >
          {/* Amount & Date */}
          <div className="flex flex-col">
            {/* Amount */}
            <span
              className={cn(
                "text-lg font-medium",
                t.transaction_type === "TOPUP"
                  ? "text-green-500"
                  : "text-red-500",
              )}
            >
              {t.transaction_type === "TOPUP" ? "+" : "-"}{" "}
              {`Rp${Intl.NumberFormat("id-ID").format(t.total_amount)}`}
            </span>

            {/* Date */}
            <span className="text-sm text-gray-400">
              {`${dayjs
                .tz(t.created_on, "Asia/Jakarta")
                .format("DD MMMM YYYY HH:mm")} WIB`}
            </span>
          </div>

          {/* Info */}
          <span>{t.description}</span>
        </div>
      ))}

      {showMore && (
        <button
          className="mx-auto block cursor-pointer font-medium text-red-500"
          onClick={() => fetchMore()}
        >
          Show more
        </button>
      )}
    </div>
  );
}
