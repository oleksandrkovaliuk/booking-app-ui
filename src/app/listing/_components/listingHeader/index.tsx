"use client";
import React from "react";

import styles from "./listingHeader.module.scss";
import { Logo } from "@/svgs/Logo";
import Link from "next/link";
import { UserMenu } from "@/components/userMenu";
import { useSearchParams } from "next/navigation";
import {
  ExtractAvailableQueryParams,
  PrepareExtractedQueryParams,
} from "@/helpers/paramsManagment";
export const ListingHeader: React.FC = () => {
  const params = useSearchParams();
  const preparedParams = PrepareExtractedQueryParams({
    searchParamsResult: ExtractAvailableQueryParams(params),
  });
  return (
    <header className={styles.listing_header}>
      <nav className={styles.listing_header_nav}>
        <Link href={`/?${preparedParams}`} className={styles.logo_link}>
          <Logo className={styles.logo} />
        </Link>

        <UserMenu showArrow={false} />
      </nav>
    </header>
  );
};
