"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function EditListingCategory() {
  const pathname = usePathname();

  return (
    <div style={{ height: "100000px" }}>
      <div>edit category</div>
    </div>
  );
}
