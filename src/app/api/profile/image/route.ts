import { ACCESS_TOKEN } from "@/lib/constants";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const cookieStore = await cookies();

  const formData = await request.formData();
  const file = formData.get("file") as File;

  const axiosFormData = new FormData();
  axiosFormData.append("file", file);

  try {
    const { data, status } = await axios.put(
      `${process.env.API_URL}/profile/image`,
      axiosFormData,
      {
        headers: {
          Authorization: `Bearer ${cookieStore.get(ACCESS_TOKEN)?.value}`,
          "Content-Type": "multipart/form-data",
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
