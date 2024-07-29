import NextAuth from "next-auth/next";
import { User } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: Roles;
  }

  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: Roles;
    };
  }

  interface Token {
    role?: Roles;
  }
}