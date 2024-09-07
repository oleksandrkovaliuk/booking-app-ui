"use client";

import React from "react";
import { Provider } from "react-redux";
import { api } from "@/store/api/api";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/system";

import { store } from "@/store";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ApiProvider api={api}>
        <Provider store={store}>
          <NextUIProvider>{children}</NextUIProvider>
        </Provider>
      </ApiProvider>
    </SessionProvider>
  );
}
