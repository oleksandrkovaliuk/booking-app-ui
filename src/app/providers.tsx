"use client";

import React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/store";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <NextUIProvider>
          <NextThemesProvider {...themeProps} forcedTheme="light">
            {children}
          </NextThemesProvider>
        </NextUIProvider>
      </Provider>
    </SessionProvider>
  );
}
