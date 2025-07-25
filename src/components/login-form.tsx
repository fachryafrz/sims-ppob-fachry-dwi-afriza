"use client";

import { siteConfig } from "@/config/site";
import { Error } from "@/lib/types";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { AtSign, Eye, EyeOff, LockKeyhole, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<Error | null>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post("/api/login", {
        email: email.trim(),
        password: password.trim(),
      });

      toast.success(data.message);

      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        setError(error.response?.data);
        if (error.response?.data.message.includes("password")) {
          setPassword("");
        }
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-10 px-4">
      {/* App Name */}
      <div className="flex items-center gap-2">
        {/* Logo */}
        <img src={siteConfig.logo} alt="" draggable={false} />

        {/* App Name */}
        <span className="text-2xl font-medium">{siteConfig.name}</span>
      </div>

      <h1 className="max-w-xs text-center text-3xl font-medium">
        Masuk atau buat akun untuk memulai
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-8"
      >
        {/* Email */}
        <div
          className={cn(
            "flex items-center gap-2 rounded border border-gray-400/75 px-4 py-3 text-gray-400/75",
            error?.message.includes("email") && "border-red-500 text-red-500",
          )}
        >
          <AtSign size={16} className={cn(email && "text-black")} />
          <input
            type="email"
            placeholder="masukan email anda"
            className={
              "grow text-black outline-none placeholder:text-gray-400/75"
            }
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        {/* Password */}
        <div
          className={cn(
            "flex items-center gap-2 rounded border border-gray-400/75 px-4 py-3 text-gray-400/75",
            error?.message.includes("password") &&
              "border-red-500 text-red-500",
          )}
        >
          <LockKeyhole size={16} className={cn(password && "text-black")} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="masukan password anda"
            className="grow text-black outline-none placeholder:text-gray-400/75"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <button
          type="submit"
          className="mt-8 cursor-pointer rounded bg-red-500 px-4 py-3 text-sm font-medium text-white hover:bg-red-500/75 disabled:cursor-default disabled:opacity-50"
          disabled={loading}
        >
          Masuk
        </button>
      </form>

      <span className="text-sm text-gray-500">
        belum punya akun? registrasi{" "}
        <Link href={"/registration"} className="font-medium text-red-500">
          di sini
        </Link>
      </span>

      {/* Error */}
      {error && (
        <div className="absolute right-8 bottom-12 left-8 flex items-center justify-between bg-red-100 px-4 py-2 text-sm text-red-500">
          {error.message}
          <button className="cursor-pointer" onClick={() => setError(null)}>
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
