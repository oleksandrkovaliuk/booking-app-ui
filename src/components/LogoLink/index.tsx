import React from "react";
import Link from "next/link";

import { Logo } from "@/svgs/Logo";

import styles from "./logoLink.module.scss";

export const LogoLink: React.FC<{
  colorTheme?: "black" | "primary";
  href: string;
  handleOnClick?: () => void;
}> = ({ colorTheme, href, handleOnClick }) => {
  return (
    <Link
      href={href}
      className={styles.logo_link}
      data-color-theme={colorTheme}
      onClick={!!handleOnClick ? handleOnClick : () => {}}
    >
      <Logo className={styles.logo_icon} />
    </Link>
  );
};
