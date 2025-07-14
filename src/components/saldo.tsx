"use client";

import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";
import Skeleton from "./skeleton";

export default function Saldo() {
  const [showAmount, setShowAmount] = useState(true);

  const { data } = useSWR("/api/balance", async (url) => {
    return await axios.get(url).then(({ data }) => data.data);
  });

  return (
    <div className="relative">
      {/* Background */}
      <img
        src="/assets/Background Saldo.png"
        alt=""
        draggable={false}
        className="min-h-[160px] rounded-2xl object-cover object-right"
      />

      {/* Info */}
      <div className="absolute inset-0 space-y-3 p-6 text-white">
        <span className="block">Saldo anda</span>

        {data ? (
          <span className="block text-3xl font-medium">
            {showAmount
              ? `Rp ${Intl.NumberFormat("id-ID").format(data.balance)}`
              : `Rp •••••••`}
          </span>
        ) : (
          <Skeleton className="h-9 w-40" />
        )}

        <div className="mt-5 flex items-center gap-3 text-xs font-medium">
          Lihat Saldo{" "}
          <button
            className="cursor-pointer"
            onClick={() => setShowAmount(!showAmount)}
          >
            {showAmount ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
