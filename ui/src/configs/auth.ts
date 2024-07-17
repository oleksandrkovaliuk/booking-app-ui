import type { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { AccessUser } from "@/app/api/apiCalls";

export const authConfig: AuthOptions = {
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
    Facebook({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET!,
      authorization: {
        params: {
          redirect_uri:
            process.env.NEXT_PUBLIC_UI_URL + "/api/auth/callback/facebook",
        },
      },
    }),
    Credentials({
      credentials: {
        email: { label: "email", type: "text", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const res = await AccessUser(credentials);
        if (res.status === "authorized") {
          return { ...res, email: atob(credentials?.email) };
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
