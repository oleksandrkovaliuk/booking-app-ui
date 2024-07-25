import React from "react";

import { ManageNavigation } from "./components/manageNavigation/manageNavigation";
import { Providers } from "../providers";

export default function ManageLayout({
  children,
  isCutted,
}: {
  children: React.ReactNode;
  isCutted?: boolean;
}) {
  return (
    <Providers>
      <ManageNavigation isCutted={isCutted} />
      <main>{children}</main>
    </Providers>
  );
}
