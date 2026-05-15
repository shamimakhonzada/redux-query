import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const publicPaths = ["/signin", "/signup"];

  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith("/api/"),
  );

  // No token → redirect to signin (except public paths)
  if (!accessToken && !isPublicPath) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Has token → don't let them stay on signin
  if (accessToken && pathname === "/signin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
