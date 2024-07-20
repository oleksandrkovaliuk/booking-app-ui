"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";

import { EyesIcon } from "@/svgs/EyesIcon";

import styles from "../error.module.scss";

const ErrorOAuth = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className={styles.error_wrap}>
      <EyesIcon />
      <p className={styles.error_message_title}>Opppsss...</p>
      <p className={styles.error_message_text}>
        Something went wrong with your authentication. Please try again or use
        another method to login.
      </p>
      <Button color="primary" size="lg" variant="light">
        <Link href="/">Back to home </Link>
      </Button>
      <Button color="primary" size="lg" variant="light">
        <Link href="/login">Back to login </Link>
      </Button>
    </div>
  );
};

export default ErrorOAuth;
