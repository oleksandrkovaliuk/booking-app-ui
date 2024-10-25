import type { Metadata } from "next";
import { Toaster } from "sonner";

import { Providers } from "./providers";

import { NotificationModal } from "@/components/notificationModal";

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
          <NotificationModal />
          <div className="wrapper">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
