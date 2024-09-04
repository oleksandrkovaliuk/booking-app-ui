import NextAuth from "next-auth/next";
import { User } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: Roles;
    jti?: string;
  }

  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: Roles;
      jti?: string;
    };
  }

  interface Token {
    role?: Roles;
    jti?: string;
  }
}
