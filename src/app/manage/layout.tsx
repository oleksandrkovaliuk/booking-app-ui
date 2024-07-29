import React from "react";
import { ManageNavigation } from "./_components/manageNavigation/manageNavigation";

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ManageNavigation isCutted={false} />
      <main>{children}</main>
    </>
  );
}
