"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface Error {
  data: string;
  message: string;
  status: number;
}

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<Error>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("/api/login", { email, password });

      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        setError(error.response?.data);
      }
    }
  };

  return (
    <div className="space-y-4">
      <h1>Login</h1>

      {error && <p>{error.message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button type="submit">Masuk</button>
      </form>
    </div>
  );
}
