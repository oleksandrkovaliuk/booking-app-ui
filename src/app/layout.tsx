import { Providers } from "./providers";
import { Toaster } from "sonner";

import "./globals.scss";
import type { Metadata } from "next";

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
          <div className="wrapper">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
