"use client";

import { Error } from "@/lib/types";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { AtSign, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";

export default function AkunForm() {
  const router = useRouter();

  const { mutate } = useSWRConfig();

  const { data } = useSWR("/api/profile", async (url) => {
    return await axios.get(url).then(({ data }) => data.data);
  });

  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(data?.email);
  const [firstName, setFirstName] = useState(data?.first_name);
  const [lastName, setLastName] = useState(data?.last_name);
  const [error, setError] = useState<Error | null>();

  const handleSubmit = async () => {
    try {
      await axios.put("/api/profile/update", {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
      });

      setIsEditing(false);
      setError(null);

      mutate("/api/profile");

      toast.success("Berhasil mengubah akun");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");

      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  };

  useEffect(() => {
    setEmail(data?.email);
    setFirstName(data?.first_name);
    setLastName(data?.last_name);
  }, [data]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-full space-y-6"
    >
      {/* Email */}
      <div className="space-y-2">
        <label className="block">Email</label>

        <div
          className={cn(
            "flex items-center gap-2 rounded border border-gray-400/75 px-4 py-3 text-gray-400/75",
          )}
        >
          <AtSign size={16} />
          <input
            type="email"
            placeholder="masukan email anda"
            className={
              "grow text-black outline-none placeholder:text-gray-400/75 disabled:text-gray-400/75"
            }
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled
          />
        </div>
      </div>

      {/* Nama Depan */}
      <div className="space-y-2">
        <label className="block">Nama Depan</label>

        <div
          className={cn(
            "relative flex items-center gap-2 rounded border border-gray-400/75 px-4 py-3 text-gray-400/75",
            error?.message.includes("first_name") &&
              "border-red-500 text-red-500",
          )}
        >
          <User
            size={16}
            className={cn(firstName && isEditing && "text-black")}
          />
          <input
            type="text"
            placeholder="masukan nama depan anda"
            className={
              "grow text-black outline-none placeholder:text-gray-400/75 disabled:text-gray-400/75"
            }
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            disabled={!isEditing}
          />

          {/* Error */}
          {error?.message.includes("first_name") && (
            <span className="absolute right-0 -bottom-6 text-sm text-red-500">
              Nama depan harus diisi
            </span>
          )}
        </div>
      </div>

      {/* Nama Belakang */}
      <div className="mb-8 space-y-2">
        <label className="block">Nama Belakang</label>

        <div
          className={cn(
            "relative flex items-center gap-2 rounded border border-gray-400/75 px-4 py-3 text-gray-400/75",
            error?.message.includes("last_name") &&
              "border-red-500 text-red-500",
          )}
        >
          <User
            size={16}
            className={cn(lastName && isEditing && "text-black")}
          />
          <input
            type="text"
            placeholder="masukan nama depan anda"
            className={
              "grow text-black outline-none placeholder:text-gray-400/75 disabled:text-gray-400/75"
            }
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            disabled={!isEditing}
          />

          {/* Error */}
          {error?.message.includes("last_name") && (
            <span className="absolute right-0 -bottom-6 text-sm text-red-500">
              Nama belakang harus diisi
            </span>
          )}
        </div>
      </div>

      {/* CTA */}
      <button
        type="submit"
        className={cn(
          "w-full cursor-pointer rounded bg-red-500 px-4 py-3 text-sm font-medium text-white",
          isEditing ? "block" : "hidden",
        )}
      >
        Simpan
      </button>
      <button
        type="button"
        className={cn(
          "block w-full cursor-pointer rounded border border-red-500 px-4 py-3 text-sm font-medium text-red-500",
          isEditing ? "block" : "hidden",
        )}
        onClick={() => setIsEditing(false)}
      >
        Batalkan
      </button>
      <button
        type="button"
        className={cn(
          "block w-full cursor-pointer rounded bg-red-500 px-4 py-3 text-sm font-medium text-white",
          !isEditing ? "block" : "hidden",
        )}
        onClick={() => setIsEditing(true)}
      >
        Edit Profil
      </button>
      <button
        type="button"
        className={cn(
          "block w-full cursor-pointer rounded border border-red-500 px-4 py-3 text-sm font-medium text-red-500",
          !isEditing ? "block" : "hidden",
        )}
        onClick={handleLogout}
      >
        Logout
      </button>
    </form>
  );
}
