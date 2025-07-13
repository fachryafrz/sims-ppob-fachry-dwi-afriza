import { ACCESS_TOKEN } from "@/lib/constants";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = await cookies();

  const { searchParams } = new URL(request.url);

  const { offset, limit } = Object.fromEntries(searchParams.entries());

  try {
    const { data, status } = await axios.get(
      `${process.env.API_URL}/transaction/history`,
      {
        headers: {
          Authorization: `Bearer ${cookieStore.get(ACCESS_TOKEN)?.value}`,
        },
        params: { offset, limit },
      },
    );

    return NextResponse.json(data, { status });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
}
