//src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = null;
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|image|favicon.ico|login).*)"],
};
