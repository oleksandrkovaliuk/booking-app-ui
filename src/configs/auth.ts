import type { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { AccessUser, InsertOAuthUser } from "@/app/api/apiCalls";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { FacebookProfile, GoogleProfile } from "@/utilities/type";

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
        console.log(credentials, "check");
        if (!credentials?.email || !credentials?.password) return null;
        const res = await AccessUser(credentials);

        if (res.status === "authorized") {
          return { ...res, email: atob(credentials?.email) };
        } else {
          throw new Error(res.message);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google" || account?.provider === "facebook") {
        try {
          await InsertOAuthUser({
            email: profile?.email!,
            user_name: profile?.name,
            img_url:
              account?.provider === "google"
                ? (profile as GoogleProfile).picture!
                : (profile as FacebookProfile).picture.data.url!,
            provider: account?.provider,
          });
          return true;
        } catch (error) {
          toast.error((error as Error).message);
          return false;
        }
      }
      return true;
    },
  },
  session: {
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    error: "/login/error",
  },
};
