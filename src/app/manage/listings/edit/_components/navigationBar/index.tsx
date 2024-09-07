"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Tooltip } from "@nextui-org/react";
import { usePathname } from "next/navigation";

import { MenuIcon } from "@/svgs/MenuIcon";

import { EditOverviewIcon } from "@/svgs/EditOverviewIcon";
import { EditCategoryIcon } from "@/svgs/EditCategoryIcon";
import { EditTypeIcon } from "@/svgs/EditTypeIcon";
import { EditLocationIcon } from "@/svgs/EditLocationIcon";
import { EditBasicsIcon } from "@/svgs/EditBasicsIcon";
import { EditImagesIcon } from "@/svgs/EditImagesIcon";
import { EditDetailsIcon } from "@/svgs/EditDetailsIcon";
import { EditPriceIcon } from "@/svgs/EditPriceIcon";

import { NavigationBarProps } from "./type";

import styles from "./navigationBar.module.scss";

export const NavigationBar: React.FC<NavigationBarProps> = ({
  params,
  children,
}) => {
  const pathname = usePathname();

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isNavBarActive, setIsNavBarActive] = useState<boolean>(true);
  const [unsavedSelection, setUnsavedSelection] = useState<string[]>([]);

  const TabsContent = [
    {
      id: 1,
      href: `/manage/listings/edit/${params.user}/${params.id}/overview`,
      content: "Overview",
      key: ["overview"],
      icon: <EditOverviewIcon />,
    },
    {
      id: 2,
      href: `/manage/listings/edit/${params.user}/${params.id}/category`,
      content: "Category",
      key: ["edit_category"],
      icon: <EditCategoryIcon />,
    },
    {
      id: 3,
      href: `/manage/listings/edit/${params.user}/${params.id}/type`,
      content: "Type of listing",
      key: ["edit_type"],
      icon: <EditTypeIcon />,
    },
    {
      id: 4,
      href: `/manage/listings/edit/${params.user}/${params.id}/location`,
      content: "Location",
      key: ["edit_cordinates", "edit_address"],
      icon: <EditLocationIcon />,
    },
    {
      id: 5,
      href: `/manage/listings/edit/${params.user}/${params.id}/basic`,
      content: "Basics",
      key: ["edit_accesable", "edit_pets_allowed", "edit_guests"],
      icon: <EditBasicsIcon />,
    },
    {
      id: 6,
      href: `/manage/listings/edit/${params.user}/${params.id}/images`,
      content: "Images",
      key: ["edit_images"],
      icon: <EditImagesIcon />,
    },
    {
      id: 7,
      href: `/manage/listings/edit/${params.user}/${params.id}/details`,
      content: "Details",
      key: ["edit_title", "edit_placeis", "edit_aboutplace", "edit_notes"],
      icon: <EditDetailsIcon />,
    },
    {
      id: 9,
      href: `/manage/listings/edit/${params.user}/${params.id}/price`,
      content: "Price",
      key: ["edit_price"],
      icon: <EditPriceIcon />,
    },
  ];

  const checkIfAnyUnsavedChanges = useCallback(() => {
    const key = Object.keys(localStorage);
    if (key.some((item) => item.startsWith("edit"))) {
      localStorage.setItem(
        `${params.id}isAnyUnsavedChanges`,
        JSON.stringify(true)
      );
      setUnsavedSelection(key.filter((item) => item.startsWith("edit")));
    } else {
      localStorage.setItem(
        `${params.id}isAnyUnsavedChanges`,
        JSON.stringify(false)
      );
    }
  }, [params.id]);

  useEffect(() => {
    const screen = window.innerWidth;
    if (screen < 768) {
      setIsMobile(true);
      setIsNavBarActive(false);
    } else {
      setIsMobile(false);
    }
    checkIfAnyUnsavedChanges();

    return () => {
      setUnsavedSelection([]);
      checkIfAnyUnsavedChanges();
    };
  }, [checkIfAnyUnsavedChanges]);

  return (
    <>
      <div
        className={styles.mobile_navigation_background}
        data-active={isNavBarActive && isMobile}
      />

      {isMobile && (
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
          <button
            className={styles.mobile_navigation_show_button}
            onClick={() => setIsNavBarActive(!isNavBarActive)}
            aria-label="Menu"
          >
            <MenuIcon className={styles.menu_icon} />
          </button>
        </Tooltip>
      )}

      <motion.header
        className={styles.navigationBar_container}
        initial={
          isMobile
            ? { left: 0 }
            : {
                maxWidth: "clamp(160px, 9vw, 10dvw)",
              }
        }
        animate={
          isMobile
            ? isNavBarActive
              ? { left: "0%" }
              : { left: "-100%" }
            : isNavBarActive
            ? { maxWidth: "clamp(160px, 9vw, 10dvw)" }
            : { maxWidth: "clamp(32px, 0vw, 0dvw)" }
        }
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <motion.div
          className={styles.navigationBar_wrap}
          initial={{
            paddingInline: "10px",
          }}
          animate={
            isNavBarActive
              ? {
                  paddingInline: "10px",
                }
              : {
                  paddingInline: "0px",
                }
          }
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <motion.ul className={styles.navigation_tabs_wrap}>
            {TabsContent.map((tab) => (
              <Link
                key={tab.id}
                href={tab.href}
                data-active={pathname.trim() === tab.href.trim()}
                className={styles.navigation_tab}
              >
                {isNavBarActive ? (
                  <div className={styles.tab_icon}>{tab.icon}</div>
                ) : (
                  <Tooltip
                    placement="right"
                    content={tab.content}
                    color="default"
                    size="sm"
                    delay={200}
                    classNames={{
                      content: ["text-#2f2f2f font-small rounded-md"],
                    }}
                  >
                    <div className={styles.tab_icon}>{tab.icon}</div>
                  </Tooltip>
                )}

                {tab.content}
                {tab.key?.some((item: string) =>
                  unsavedSelection.includes(item!)
                ) && <span className={styles.circle} />}
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
      </motion.header>
      <motion.div
        className={styles.content_wrap}
        initial={{
          paddingLeft: "clamp(160px, 9vw, 10dvw)",
        }}
        animate={
          isNavBarActive
            ? {
                paddingLeft: "clamp(160px, 9vw, 10dvw)",
              }
            : {
                paddingLeft: "clamp(32px, 0vw, 0dvw)",
              }
        }
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </>
  );
};
