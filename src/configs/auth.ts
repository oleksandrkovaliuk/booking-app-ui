import { toast } from "sonner";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";

import { store } from "@/store";
import { AccesUser } from "@/store/api/endpoints/auth/accesUser";
import { AccesOAuthUser } from "@/store/api/endpoints/auth/accesOAuthUser";

import { Roles } from "@/_utilities/enums";

import type { AuthOptions, User } from "next-auth";
import { FacebookProfile, GoogleProfile } from "@/_utilities/type";

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

        const res = await store
          .dispatch(
            AccesUser.initiate({
              email: credentials.email,
              password: credentials.password,
            })
          )
          .unwrap();

        if (res.status === "authorized" && res.user) {
          return {
            ...res.user,
            email: res.user?.email,
            role: (res.user.role as Roles) || (Roles.USER as Roles),
          } as User;
        } else {
          throw new Error(res.message);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: any) {
      if (account?.provider === "google" || account?.provider === "facebook") {
        try {
          const result = await store
            .dispatch(
              AccesOAuthUser.initiate({
                email: profile?.email!,
                user_name: profile?.name,
                img_url:
                  account?.provider === "google"
                    ? (profile as GoogleProfile).picture!
                    : (profile as FacebookProfile).picture.data.url!,
                provider: account?.provider,
              })
            )
            .unwrap();

          if (result.role) {
            account.role = result.role as Roles;
            return true;
          } else {
            return false;
          }
        } catch (error) {
          toast.error((error as Error).message);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, account, user }) {
      if (account) {
        token.role = (account.role as Roles) || user.role || Roles.USER;
        token.jti = account.id_token;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as Roles;
        session.user.jti = token.jti as string;
      }
      return session;
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
