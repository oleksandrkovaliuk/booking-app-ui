"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { useSelector } from "@/store";
import { NotificationSelector } from "@/store/selectors/notificationsState";

import { LogoLink } from "@/components/LogoLink";
import { UserMenu } from "@/components/userMenu";

import styles from "./manageNavigation.module.scss";

interface ManageNavigationProps {
  isCutted?: boolean;
}
export const ManageNavigation: React.FC<ManageNavigationProps> = ({
  isCutted,
}) => {
  const path = usePathname();
  const { notificationIn } = useSelector(NotificationSelector);

  return (
    <header className={styles.manage_header}>
      <motion.nav className={styles.manage_navigation}>
        <LogoLink href={"/"} colorTheme="black" />
        {!isCutted && (
          <motion.div className={styles.navigation_menu}>
            <Link
              href={"/manage/listings"}
              className={styles.navigation_links}
              data-selected={path === "/manage/listings"}
            >
              Лістинги
            </Link>
            {/* <Link
              href={"/manage/reviews"}
              className={styles.navigation_links}
              data-selected={path === "/manage/reviews"}
            >
              Review
            </Link> */}
            <Link
              href={"/manage/inbox"}
              className={styles.navigation_links}
              data-selected={path === "/manage/inbox"}
            >
              Повідомлення
              {notificationIn.INBOX_MESSAGE && (
                <span className={styles.notification_badge}></span>
              )}
            </Link>
          </motion.div>
        )}
        <UserMenu showArrow={false} />
      </motion.nav>
    </header>
  );
};
