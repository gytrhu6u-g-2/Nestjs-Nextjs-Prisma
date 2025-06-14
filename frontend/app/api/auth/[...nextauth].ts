import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // `credentials`は、サインインページでフォームを生成するために使用されます。
      credentials: {
        email: { label: "Eメール", type: "text" },
        password: { label: "パスワード", type: "password" },
      },
      async authorize(credentials, req) {
        const user = {
          id: "1",
          name: "test",
          email: "test@mail.com",
          backendToken: "backEndAccessToken",
        };

        if (user) {
          // 返されたオブジェクトはすべて、JWT の「user」プロパティに保存されます。
          return user;
        } else {
          // 認証失敗の場合はnullを返却します。
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // `jwt()`コールバックは`authorize()`の後に実行されます。
    jwt({ token, user }) {
      if (user) {
        token.backendToken = user.backendToken;
      }
      return token;
    },
    // `session()`コールバックは`jwt()`の後に実行されます。
    session({ session, token }) {
      session.user.backendToken = token.backendToken;
      return session;
    },
  },
});
