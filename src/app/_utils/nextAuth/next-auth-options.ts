import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const nextAuthOptions: NextAuthOptions = {
  debug: true,
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // Googleログインの場合、トークン情報をカスタムプロパティとして追加
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      // セッションにJWTの情報を追加
      session.accessToken = token.accessToken; //accessTokenは、Googleログインの場合のみ存在
      session.idToken = token.idToken;
      session.sub = token.sub;
      return session;
    },
  },
};
