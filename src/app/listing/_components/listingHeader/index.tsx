"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import { LogoLink } from "@/components/LogoLink";
import { UserMenu } from "@/components/userMenu";

import styles from "./listingHeader.module.scss";

export const ListingHeader: React.FC = () => {
  const params = useSearchParams();
  return (
    <header className={styles.listing_header}>
      <nav className={styles.listing_header_nav}>
        <LogoLink colorTheme="black" href={`/?${params.toString()}`} />

        <UserMenu showArrow={false} />
      </nav>
    </header>
  );
};
