import { ACCESS_TOKEN } from "@/lib/constants";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = await cookies();

  const { top_up_amount } = await request.json();

  try {
    const { data, status } = await axios.post(
      `${process.env.API_URL}/topup`,
      { top_up_amount },
      {
        headers: {
          Authorization: `Bearer ${cookieStore.get(ACCESS_TOKEN)?.value}`,
        },
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
