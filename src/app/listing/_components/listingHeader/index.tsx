"use client";
import React from "react";

import styles from "./listingHeader.module.scss";
import { Logo } from "@/svgs/Logo";
import Link from "next/link";
import { UserMenu } from "@/components/userMenu";
export const ListingHeader: React.FC = () => {
  return (
    <header className={styles.listing_header}>
      <nav className={styles.listing_header_nav}>
        <Link href="/" className={styles.logo_link}>
          <Logo className={styles.logo} />
        </Link>

        <UserMenu />
      </nav>
    </header>
  );
};
