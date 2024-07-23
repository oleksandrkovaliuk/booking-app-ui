import React from "react";

import { ManageNavigation } from "./components/manageNavigation/manageNavigation";

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ManageNavigation />
      <main>{children}</main>
    </>
  );
}
