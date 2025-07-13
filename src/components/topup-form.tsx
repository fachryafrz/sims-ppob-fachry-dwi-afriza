"use client";

import { useConfirmation } from "@/hooks/use-confirmation";
import { useStatus } from "@/hooks/use-status";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { Banknote } from "lucide-react";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";

const MAX_TOPUP = 1_000_000;

export default function TopupForm() {
  const { mutate } = useSWRConfig();

  const {
    onOpen,
    onClose,
    setAmount: setAmountConfirmation,
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

  const [amount, setAmount] = useState("");

  const options = [
    { value: 10000, label: "Rp10.000" },
    { value: 20000, label: "Rp20.000" },
    { value: 50000, label: "Rp50.000" },
    { value: 100000, label: "Rp100.000" },
    { value: 250000, label: "Rp250.000" },
    { value: 500000, label: "Rp500.000" },
  ];

  const handleSubmit = async () => {
    onClose();

    if (Number(amount) > MAX_TOPUP) {
      toast.error(
        `Maksimal Top Up Rp${Intl.NumberFormat("id-ID").format(MAX_TOPUP)}`,
      );
      return;
    }

    try {
      await axios.post("/api/topup", {
        top_up_amount: Number(amount),
      });

      mutate("/api/balance");

      setAmount("");

      onOpenStatus();
      setDescriptionStatus(`Top Up sebesar`);
      setAmountStatus(Number(amount));
      setStatus("berhasil");
    } catch (error) {
      if (error instanceof AxiosError) {
        onOpenStatus();
        setDescriptionStatus(`Top Up sebesar`);
        setAmountStatus(Number(amount));
        setStatus(error.response?.data.message);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        onOpen();
        setDescription(`Anda yakin untuk Top Up sebesar`);
        setAmountConfirmation(Number(amount));
        setOnConfirm(handleSubmit);
        setConfirmText("Ya, lanjutkan Bayar");
      }}
      className="grid grid-cols-2 grid-rows-2 gap-4 sm:grid-cols-3 md:grid-cols-6 xl:grid-cols-12"
    >
      {/* Input */}
      <div
        className={cn(
          "col-span-full flex items-center gap-2 rounded border border-gray-400/75 px-4 py-3 text-gray-400/75 xl:col-span-9",
          // error?.message.includes("email") && "border-red-500 text-red-500",
        )}
      >
        <Banknote className={cn(amount && "text-black")} />
        <CurrencyInput
          placeholder="masukan nominal Top Up"
          onValueChange={(value) => {
            setAmount(value || "");
          }}
          groupSeparator="."
          decimalSeparator=","
          value={amount}
          className="grow text-black outline-none placeholder:text-gray-400/75"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className={cn(
          "col-span-full row-start-2 rounded px-4 py-3 text-sm font-medium text-white xl:col-span-9",
          amount ? "cursor-pointer bg-red-500" : "bg-gray-400",
        )}
        disabled={!amount}
      >
        Top Up
      </button>

      {/* Options */}
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className="w-full cursor-pointer rounded border border-gray-400/75 p-2 text-sm"
          onClick={() => setAmount(option.value.toString())}
        >
          {option.label}
        </button>
      ))}
    </form>
  );
}
