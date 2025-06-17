// src/middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// middleware 本体
export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log(`トークンの値 ${token}`);

  // 未ログインなら /login にリダイレクト
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ログイン済みなら次の処理へ
  return NextResponse.next();
}

// 対象ルート設定：api、staticファイルなどは除外
export const config = {
  matcher: [
    "/((?!api|auth|_next/static|_next/image|image|favicon.ico|login).*)",
  ],
};
