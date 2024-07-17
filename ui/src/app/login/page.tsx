"use client";

import React, { Suspense } from "react";
import { LoginModal } from "./modal";

const LogInPage = () => {
  return (
    <Suspense fallback={null}>
      <LoginModal />
    </Suspense>
  );
};

export default LogInPage;
