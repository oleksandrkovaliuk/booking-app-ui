"use client";

import React from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/system";

import { store } from "@/store";
import { IsSearchTriggeredProvider } from "./_lib/context/providers";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <IsSearchTriggeredProvider>
          <NextUIProvider>{children}</NextUIProvider>
        </IsSearchTriggeredProvider>
      </Provider>
    </SessionProvider>
  );
}
