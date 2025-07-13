"use client";

import { useStatus } from "@/hooks/use-status";
import Link from "next/link";

export default function ModalStatus() {
  const { onClose, description, amount, status } = useStatus();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      {/* Box */}
      <div className="flex w-full max-w-xs flex-col items-center gap-6 rounded-lg bg-white p-8">
        {/* Icon */}
        {status === "berhasil" ? (
          <img src={"/assets/success.svg"} alt="" className="w-16" />
        ) : (
          <img src={"/assets/error.svg"} alt="" className="w-16" />
        )}

        <div className="flex flex-col text-center">
          {/* Description */}
          <span>{description}</span>

          {/* Amount */}
          <span className="text-2xl font-medium">
            {`Rp${Intl.NumberFormat("id-ID").format(Number(amount))}`}
          </span>

          {/* Status */}
          <span>{status}</span>
        </div>

        {/* Continue CTA */}
        <Link
          href="/"
          className="cursor-pointer font-medium text-red-500"
          onClick={onClose}
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
