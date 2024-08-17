"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";

import { NotFoundIcon } from "@/svgs/NotFoundIcon";

import "@/app/error.scss";

const ErrorOAuth = () => {
  return (
    <div className="error_wrap">
      <NotFoundIcon />
      <h2>Opppsss...</h2>
      <p>
        Something went wrong with your authentication. Please try again or use
        another method to login.
      </p>
      <div className="buttons">
        <Button color="primary" size="lg" variant="flat">
          <Link href="/">Back to home </Link>
        </Button>
        <Button color="primary" size="lg" variant="flat">
          <Link href="/login">Back to login </Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorOAuth;
