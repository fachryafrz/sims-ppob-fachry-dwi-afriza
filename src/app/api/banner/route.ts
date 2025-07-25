import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, status } = await axios.get(`${process.env.API_URL}/banner`);

    return NextResponse.json(data, { status });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
}
