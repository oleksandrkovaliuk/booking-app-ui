"use client";
import React from "react";

import styles from "./listingHeader.module.scss";

import { LogoLink } from "@/components/LogoLink";
import { UserMenu } from "@/components/userMenu";

export const ListingHeader: React.FC = () => {
  return (
    <header className={styles.listing_header}>
      <nav className={styles.listing_header_nav}>
        <LogoLink colorTheme="black" />

        <UserMenu showArrow={false} />
      </nav>
    </header>
  );
};
