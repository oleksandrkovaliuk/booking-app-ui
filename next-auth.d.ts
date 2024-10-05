import { NextAuth } from "next-auth";
import { User as NextAuthUser } from "next-auth";
import { Roles } from "@/_utilities/enums";

declare module "next-auth" {
  interface User {
    name: string | null;
    email: string;
    image: string | null;
    jwt: string;
    role: Roles;
  }

  interface Session {
    user: {
      name: string | null;
      email: string | null;
      image: string | null;
      jwt: string;
      role: Roles;
    };
  }

  interface Token {
    role: Roles;
    jwt: string;
  }
}
