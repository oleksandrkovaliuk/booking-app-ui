"use client";

import React, { Suspense } from "react";
import { LoginModal } from "./modal";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import ErrorOAuth from "./error/page";

const LogInPage = () => {
  return (
    <Suspense fallback={null}>
      <ErrorBoundary errorComponent={ErrorOAuth}>
        <LoginModal />
      </ErrorBoundary>
    </Suspense>
  );
};

export default LogInPage;
