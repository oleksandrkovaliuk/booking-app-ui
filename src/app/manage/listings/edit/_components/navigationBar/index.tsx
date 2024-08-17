"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tab, Tabs, Tooltip } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { NavigationBarProps } from "./type";

import styles from "./navigationBar.module.scss";

export const NavigationBar: React.FC<NavigationBarProps> = ({ params }) => {
  const pathname = usePathname();

  const [isNavBarActive, setIsNavBarActive] = useState<boolean>(true);

  const TabsContent = [
    {
      id: 1,
      href: `/manage/listings/edit/${params.user}/${params.id}/overview`,
      content: "Overview",
    },
    {
      id: 2,
      href: `/manage/listings/edit/${params.user}/${params.id}/category`,
      content: "Category",
    },
    {
      id: 3,
      href: `/manage/listings/edit/${params.user}/${params.id}/type`,
      content: "Type of listing",
    },
    {
      id: 4,
      href: `/manage/listings/edit/${params.user}/${params.id}/location`,
      content: "Location",
    },
    {
      id: 5,
      href: `/manage/listings/edit/${params.user}/${params.id}/guests`,
      content: "Guests",
    },
    {
      id: 6,
      href: `/manage/listings/edit/${params.user}/${params.id}/additional`,
      content: "Additional checks",
    },
    {
      id: 7,
      href: `/manage/listings/edit/${params.user}/${params.id}/images`,
      content: "Images",
    },
    {
      id: 8,
      href: `/manage/listings/edit/${params.user}/${params.id}/information`,
      content: "Information",
    },
    {
      id: 9,
      href: `/manage/listings/edit/${params.user}/${params.id}/price`,
      content: "Price",
    },
  ];
  return (
    <motion.div
      className={styles.navigationBar_container}
      initial={{
        maxWidth: "clamp(170px, 20vw, 12dvw)",
        paddingInline: "10px",
      }}
      animate={
        isNavBarActive
          ? {
              maxWidth: "clamp(170px, 20vw, 12dvw)",
              paddingInline: "10px",
            }
          : {
              maxWidth: "0px",
              paddingInline: "0px",
            }
      }
      transition={{ duration: 0.4, ease: "circInOut" }}
    >
      <motion.div className={styles.navigationBar_wrap}>
        <motion.h1 className={styles.edit_title}>
          Edit listing options
        </motion.h1>

        <motion.ul className={styles.navigation_tabs_wrap}>
          {TabsContent.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              data-active={pathname.trim() === tab.href.trim()}
              className={styles.navigation_tab}
            >
              {tab.content}
            </Link>
          ))}
        </motion.ul>
      </motion.div>

      <motion.button
        onClick={() => setIsNavBarActive(!isNavBarActive)}
        className={styles.close_button}
        data-navigation-bar-active={isNavBarActive}
      >
        <Tooltip
          placement="top"
          content={isNavBarActive ? "Close" : "Open"}
          color="primary"
          size="sm"
          delay={1000}
          classNames={{
            content: ["text-white font-medium bg-[#2f2f2f]"],
          }}
        >
          <div className={styles.close_icon} />
        </Tooltip>
      </motion.button>
    </motion.div>
  );
};
