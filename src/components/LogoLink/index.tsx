import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Logo } from "@/svgs/Logo";

import styles from "./logoLink.module.scss";

export const LogoLink: React.FC<{
  colorTheme?: "black" | "primary";
  isShouldHide?: boolean;
}> = ({ colorTheme, isShouldHide }) => {
  const params = useSearchParams();
  const preparedParams = params.toString();
  return (
    <Link
      href={`/?${preparedParams}`}
      className={styles.logo_link}
      data-color-theme={colorTheme}
      data-is-should-hide={isShouldHide}
    >
      <Logo className={styles.logo_icon} />
    </Link>
  );
};
