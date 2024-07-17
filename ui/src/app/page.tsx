"use client";
import { signOut } from "next-auth/react";
import React from "react";
export default function Home() {
  return (
    <main style={{ color: "#000000", height: "10000px" }}>
      <p>hello</p>
      <button onClick={() => signOut({ callbackUrl: "/" })}>sign out</button>
    </main>
  );
}
