"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { Logo } from "@/svgs/Logo";
import { UserMenu } from "@/components/userMenu";

import styles from "./manageNavigation.module.scss";

interface ManageNavigationProps {
  isCutted?: boolean;
}
export const ManageNavigation: React.FC<ManageNavigationProps> = ({
  isCutted,
}) => {
  const path = usePathname();

  return (
    <header className={styles.manage_header}>
      <motion.nav className={styles.manage_navigation}>
        <Link href={"/"} className={styles.logo}>
          <Logo />
        </Link>
        {!isCutted && (
          <motion.div className={styles.navigation_menu}>
            <Link
              href={"/manage/listings"}
              className={styles.navigation_links}
              data-selected={path === "/manage/listings"}
            >
              Listings
            </Link>
            <Link
              href={"/manage/reviews"}
              className={styles.navigation_links}
              data-selected={path === "/manage/reviews"}
            >
              Review
            </Link>
            <Link
              href={"/manage/inbox"}
              className={styles.navigation_links}
              data-selected={path === "/manage/inbox"}
            >
              Inbox
            </Link>
          </motion.div>
        )}
        <UserMenu showArrow={false} />
      </motion.nav>
    </header>
  );
};
