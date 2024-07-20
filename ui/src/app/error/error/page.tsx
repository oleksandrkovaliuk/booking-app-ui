"use client";

import React from "react";
import styles from "./error.module.scss";
import { EyesIcon } from "@/svgs/EyesIcon";
import Link from "next/link";
import { Button } from "@nextui-org/react";
const DefaultError = () => {
  return (
    <div className={styles.error_wrap}>
      <EyesIcon />
      <p className={styles.error_message}>Opppsss...</p>
      <p className={styles.error_message}>
        Something went wrong. Please try again.
      </p>
      <Button color="primary" size="lg" variant="light">
        <Link href="/">Back to home </Link>
      </Button>
    </div>
  );
};

export default DefaultError;
