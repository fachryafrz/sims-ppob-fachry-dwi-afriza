"use client";

import { siteConfig } from "@/config/site";
import { Error } from "@/lib/types";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { AtSign, Eye, EyeOff, LockKeyhole, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function RegistrationForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<Error | null>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError({
        data: null,
        message: "Password tidak sama",
        status: 400,
      });
      return;
    }

    try {
      const { data } = await axios.post("/api/registration", {
        email: email.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        password: confirmPassword.trim(),
      });

      setError(null);

      toast.success(data.message);

      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        setError(error.response?.data);
        if (error.response?.data.message.includes("password")) {
          setPassword("");
        }
      }
    }
  };
  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-10 px-4 py-8">
      {/* App Name */}
      <div className="flex items-center gap-2">
        {/* Logo */}
        <img src={siteConfig.logo} alt="" draggable={false} />

        {/* App Name */}
        <span className="text-2xl font-medium">{siteConfig.name}</span>
      </div>

      <h1 className="max-w-xs text-center text-3xl font-medium">
        Lengkapi data untuk membuat akun
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-8"
      >
        {/* Email */}
        <div
          className={cn(
            "relative flex items-center gap-2 rounded border border-gray-400/75 px-4 py-3 text-gray-400/75",
            (error?.message.includes("Email") ||
              error?.message.includes("email")) &&
              "border-red-500 text-red-500",
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

          {/* Error */}
          {(error?.message.includes("Email") ||
            error?.message.includes("email")) && (
            <span className="absolute right-0 -bottom-6 text-sm text-red-500">
              {error?.message}
            </span>
          )}
        </div>

        {/* Nama Depan */}
        <div
          className={cn(
            "relative flex items-center gap-2 rounded border border-gray-400/75 px-4 py-3 text-gray-400/75",
            error?.message.includes("first_name") &&
              "border-red-500 text-red-500",
          )}
        >
          <User size={16} className={cn(firstName && "text-black")} />
          <input
            type="text"
            placeholder="nama depan"
            className={
              "grow text-black outline-none placeholder:text-gray-400/75"
            }
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />

          {/* Error */}
          {error?.message.includes("first_name") && (
            <span className="absolute right-0 -bottom-6 text-sm text-red-500">
              Nama depan harus diisi
            </span>
          )}
        </div>

        {/* Nama Belakang */}
        <div
          className={cn(
            "relative flex items-center gap-2 rounded border border-gray-400/75 px-4 py-3 text-gray-400/75",
            error?.message.includes("last_name") &&
              "border-red-500 text-red-500",
          )}
        >
          <User size={16} className={cn(lastName && "text-black")} />
          <input
            type="text"
            placeholder="nama belakang"
            className={
              "grow text-black outline-none placeholder:text-gray-400/75"
            }
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />

          {/* Error */}
          {error?.message.includes("last_name") && (
            <span className="absolute right-0 -bottom-6 text-sm text-red-500">
              Nama belakang harus diisi
            </span>
          )}
        </div>

        {/* Password */}
        <div
          className={cn(
            "relative flex items-center gap-2 rounded border border-gray-400/75 px-4 py-3 text-gray-400/75",
            (error?.message.includes("Password") ||
              error?.message.includes("password")) &&
              !error?.message.includes("Password tidak sama") &&
              "border-red-500 text-red-500",
          )}
        >
          <LockKeyhole size={16} className={cn(password && "text-black")} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="buat password"
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

          {/* Error */}
          {(error?.message.includes("Password") ||
            error?.message.includes("password")) &&
            !error?.message.includes("Password tidak sama") && (
              <span className="absolute right-0 -bottom-6 text-sm text-red-500">
                {error?.message}
              </span>
            )}
        </div>

        {/* Konfirmasi Password */}
        <div
          className={cn(
            "relative flex items-center gap-2 rounded border border-gray-400/75 px-4 py-3 text-gray-400/75",
            error?.message.includes("Password tidak sama") &&
              "border-red-500 text-red-500",
          )}
        >
          <LockKeyhole
            size={16}
            className={cn(confirmPassword && "text-black")}
          />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="konfirmasi password"
            className="grow text-black outline-none placeholder:text-gray-400/75"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>

          {/* Error */}
          {error?.message.includes("Password tidak sama") && (
            <span className="absolute right-0 -bottom-6 text-sm text-red-500">
              {error?.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="mt-8 cursor-pointer rounded bg-red-500 px-4 py-3 text-sm font-medium text-white hover:bg-red-500/75"
        >
          Registrasi
        </button>
      </form>

      <span className="text-sm text-gray-500">
        sudah punya akun? login{" "}
        <Link href={"/login"} className="font-medium text-red-500">
          di sini
        </Link>
      </span>
    </div>
  );
}
