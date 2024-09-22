import React from "react";

import { HomeContent } from "./content";
import { WidthHandler } from "@/components/widthHandler";

export default function Home() {
  return (
    <WidthHandler>
      <HomeContent />
    </WidthHandler>
  );
}
