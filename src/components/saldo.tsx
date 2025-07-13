"use client";

import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

export default function Saldo() {
  const [showAmount, setShowAmount] = useState(true);

  const { data, error, isLoading } = useSWR(
    "/api/balance",
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
    <div className="relative">
      {/* Background */}
      <img src="/assets/Background Saldo.png" alt="" draggable={false} />

      {/* Info */}
      <div className="absolute inset-0 space-y-3 p-6 text-white">
        <span className="block">Saldo anda</span>

        <span className="block text-3xl font-medium">
          {showAmount
            ? `Rp ${Intl.NumberFormat("id-ID").format(data.balance)}`
            : `Rp •••••••`}
        </span>

        <div className="mt-5 flex items-center gap-3 text-xs font-medium">
          Lihat Saldo{" "}
          <button
            className="cursor-pointer bg-[#F13B2F]"
            onClick={() => setShowAmount(!showAmount)}
          >
            {showAmount ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
