import React from "react";
import { getServerSession } from "next-auth";

import { HomeContent } from "./content";
import { Roles } from "@/_utilities/enums";

export default async function Home() {
  const session = await getServerSession({
    callbacks: {
      session: async ({ session, token }) => {
        if (token?.role) session.user.role = token.role as Roles;
        return session;
      },
    },
  });
  console.log(session);
  return <HomeContent />;
}
