"use client";

import { useConfirmation } from "@/hooks/use-confirmation";
import { useStatus } from "@/hooks/use-status";
import { ServicesType } from "@/lib/types";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { Banknote } from "lucide-react";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";

export default function ServiceForm({ service }: { service: ServicesType }) {
  const {
    onOpen,
    onClose,
    setAmount,
    setDescription,
    setOnConfirm,
    setConfirmText,
  } = useConfirmation();

  const {
    onOpen: onOpenStatus,
    setDescription: setDescriptionStatus,
    setAmount: setAmountStatus,
    setStatus,
  } = useStatus();

  const handleSubmit = async () => {
    console.log(service.service_tariff);
    onClose();

    try {
      await axios.post("/api/transaction", {
        service_code: service.service_code,
      });

      onOpenStatus();
      setDescriptionStatus(
        `Pembayaran ${service.service_name.toLowerCase()} sebesar`,
      );
      setAmountStatus(service.service_tariff);
      setStatus("berhasil");
    } catch (error) {
      if (error instanceof AxiosError) {
        onOpenStatus();
        setDescriptionStatus(
          `Pembayaran ${service.service_name.toLowerCase()} sebesar`,
        );
        setAmountStatus(service.service_tariff);
        setStatus(error.response?.data.message);
      }
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          onOpen();
          setAmount(service.service_tariff);
          setDescription(`Beli ${service.service_name.toLowerCase()} senilai`);
          setOnConfirm(handleSubmit);
          setConfirmText("Ya, lanjutkan Bayar");
        }}
        className="px-24"
      >
        {/* Input */}
        <div
          className={cn(
            "flex items-center gap-2 rounded border border-gray-400/75 px-4 py-3 text-gray-400/75",
            // error?.message.includes("email") && "border-red-500 text-red-500",
          )}
        >
          <Banknote className={cn(service.service_tariff && "text-black")} />
          <CurrencyInput
            placeholder="masukan nominal"
            // onValueChange={(value, name, values) => {
            //   console.log(value, name, values);
            //   setAmount(values);
            // }}
            groupSeparator="."
            decimalSeparator=","
            value={service.service_tariff}
            disabled
            className="grow text-black outline-none placeholder:text-gray-400/75"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-6 w-full cursor-pointer rounded bg-red-500 px-4 py-3 text-sm font-medium text-white"
        >
          Bayar
        </button>
      </form>
    </>
  );
}
