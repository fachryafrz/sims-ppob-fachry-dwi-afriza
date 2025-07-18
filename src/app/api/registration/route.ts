import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    email,
    firstName: first_name,
    lastName: last_name,
    password,
  } = await request.json();

  try {
    const { data, status } = await axios.post(
      `${process.env.API_URL}/registration`,
      { email, first_name, last_name, password },
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
