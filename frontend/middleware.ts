// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("ログイン中ユーザー:", token);

  const { pathname } = request.nextUrl;

  // ルートパス（/）の場合
  if (pathname === "/") {
    if (token) {
      console.log(`トークン：${token}`);
      // ログイン済みならダッシュボードへ
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      // 未ログインならログインページへ
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 保護されたルート（ダッシュボード）で未ログインの場合
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ログインページでログイン済みの場合
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", // ルートパスを追加
    "/dashboard/:path*",
    "/login",
  ],
};
