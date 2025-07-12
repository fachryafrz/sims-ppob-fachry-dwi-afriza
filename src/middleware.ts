import { NextResponse, NextRequest } from "next/server";
import { ACCESS_TOKEN } from "./lib/constants";

const publicRoute = ["/login", "/registration"];

export function middleware(request: NextRequest) {
  const access_token = request.cookies.get(ACCESS_TOKEN);

  if (!access_token && !publicRoute.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (access_token && publicRoute.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
