import { ACCESS_TOKEN } from "@/lib/constants";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();

  try {
    const { data, status } = await axios.get(`${process.env.API_URL}/balance`, {
      headers: {
        Authorization: `Bearer ${cookieStore.get(ACCESS_TOKEN)?.value}`,
      },
    });

    return NextResponse.json(data, { status });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
}
