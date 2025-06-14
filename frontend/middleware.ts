import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = Boolean(request.cookies.get("auth_token"));

  // ログインしてなければ /login へ
  if (!isLoggedIn && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// このmiddlewareを適用するパス
export const config = {
  matcher: ["/((?!login|_next/static|_next/image|favicon.ico).*)"],
};
