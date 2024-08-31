import React from "react";
import { ListingHeader } from "./_components/listingHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ListingHeader />
      {children}
    </>
  );
}
