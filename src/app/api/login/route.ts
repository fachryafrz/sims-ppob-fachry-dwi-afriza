import { ACCESS_TOKEN } from "@/lib/constants";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = await cookies();

  const { email, password } = await request.json();

  try {
    const { data, status } = await axios.post(`${process.env.API_URL}/login`, {
      email,
      password,
    });

    cookieStore.set(ACCESS_TOKEN, data.data.token, { maxAge: 60 * 60 * 12 });

    return NextResponse.json(data, { status });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
}
