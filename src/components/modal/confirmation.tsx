"use client";

import { siteConfig } from "@/config/site";
import { useConfirmation } from "@/hooks/use-confirmation";

export default function ModalConfirmation() {
  const { onClose, description, amount, confirmText, onConfirm } =
    useConfirmation();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      {/* Box */}
      <div className="flex w-full max-w-xs flex-col items-center gap-6 rounded-lg bg-white p-8">
        {/* Icon */}
        <img src={siteConfig.logo} alt="" className="w-12" />

        <div className="flex flex-col text-center">
          {/* Description */}
          <span>{description}</span>

          {/* Amount */}
          <span className="text-2xl font-medium">{`Rp${Intl.NumberFormat(
            "id-ID",
          ).format(Number(amount))}?`}</span>
        </div>

        {/* Continue CTA */}
        <button
          onClick={onConfirm}
          className="cursor-pointer font-medium text-red-500"
        >
          {confirmText}
        </button>

        {/* Cancel CTA */}
        <button
          onClick={onClose}
          className="cursor-pointer font-medium text-gray-400"
        >
          Batalkan
        </button>
      </div>
    </div>
  );
}
