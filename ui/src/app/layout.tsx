import type { Metadata } from "next";
import { Header } from "@/layout/header";
import { Footer } from "@/layout/footer";
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
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
