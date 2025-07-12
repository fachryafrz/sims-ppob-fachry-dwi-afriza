import { ACCESS_TOKEN } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  if (!cookieStore.has(ACCESS_TOKEN)) {
    return NextResponse.json({ message: "no access token" }, { status: 400 });
  }

  cookieStore.delete(ACCESS_TOKEN);

  return NextResponse.json({ message: "success" }, { status: 200 });
}
