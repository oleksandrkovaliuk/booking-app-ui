import { Footer } from "@/layout/footer";
import { Header } from "@/layout/header";

import React from "react";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
