"use client";

import React from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/system";

import { store } from "@/store";

import { WidthHandler } from "@/components/widthHandler";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <WidthHandler>
          <NextUIProvider>{children}</NextUIProvider>
        </WidthHandler>
      </Provider>
    </SessionProvider>
  );
}
