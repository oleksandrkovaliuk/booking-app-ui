"use client";

import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/system";

import { store } from "@/store";

import { NotificationsProvider } from "@/components/notificationsProvider";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <NotificationsProvider>
          <NextUIProvider>
            <Suspense>{children}</Suspense>
          </NextUIProvider>
        </NotificationsProvider>
      </Provider>
    </SessionProvider>
  );
}
