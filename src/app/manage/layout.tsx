import React from "react";
import { ManageNavigation } from "./components/manageNavigation/manageNavigation";

export default function ManageLayout({
  children,
  isCutted,
}: {
  children: React.ReactNode;
  isCutted?: boolean;
}) {
  return (
    <>
      <ManageNavigation isCutted={isCutted} />
      <main>{children}</main>
    </>
  );
}
