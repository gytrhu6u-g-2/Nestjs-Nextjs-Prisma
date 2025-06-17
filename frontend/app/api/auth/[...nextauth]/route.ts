import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "mail" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload = {
          email: credentials?.email, // Replace with the actual email
          password: credentials?.password, // Replace with the actual password
        };

        console.log(`payload: ${payload.email} ${payload.password}`);
        console.log(`url: ${process.env.NEXTAUTH_URL}/auth`);

        try {
          const response = await fetch(`${process.env.NEXTAUTH_URL}/auth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!response.ok) {
            console.error(`NestJS auth failed: ${response.status}`);
            return null;
          }

          const user = await response.json();
          console.log(`返却値：${user}`);
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (error) {
          console.log(`エラー内容：${error}`);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
