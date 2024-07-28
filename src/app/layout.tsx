import type { Metadata } from "next";
import { Footer } from "@/layout/footer";

import { Providers } from "./providers";
import { Toaster } from "sonner";

import "./globals.scss";

export const metadata: Metadata = {
  title: "Booking-app",
  description: "Creative booking app",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="red-primary-color text-foreground bg-background">
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
