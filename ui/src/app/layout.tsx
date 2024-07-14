import type { Metadata } from "next";
import { Button } from "@nextui-org/react";

import { Header } from "@/layout/header";
import { Footer } from "@/layout/footer";
import { Providers } from "./providers";

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
          <Header />
          <main>
            {children}
            <Button color="primary" variant="shadow">
              Shadow
            </Button>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
