// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "mail" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };

        console.log(`payload: ${payload.email} ${payload.password}`);
        console.log(`url: ${process.env.NEXTAUTH_SIGN_URL}/auth`);

        try {
          const response = await fetch(
            `${process.env.NEXTAUTH_SIGN_URL}/auth`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
          );

          if (!response.ok) {
            console.error(`NestJS auth failed: ${response.status}`);
            return null;
          }

          const user = await response.json();
          console.log(`返却値：${JSON.stringify(user)}`); // JSON.stringify を追加

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.log(`エラー内容：${error}`);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 6, // 6時間
  },
  jwt: {
    maxAge: 60 * 60 * 6, // 6時間
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login", // カスタムログインページ
  },
};
