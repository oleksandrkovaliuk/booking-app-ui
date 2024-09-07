import React from "react";
import { getServerSession } from "next-auth";

import { HomeContent } from "./content";
import { Roles } from "@/_utilities/enums";

export default async function Home() {
  return <HomeContent />;
}
