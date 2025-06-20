// app/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  // ログイン済みならダッシュボードへ
  if (session) {
    redirect("/dashboard");
  }

  // 未ログインならログインページへ
  redirect("/login");
}
