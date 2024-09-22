"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";

import { useSelector } from "@/store";

import { Search } from "@/svgs/Search";
import { AddHouseIcon } from "@/svgs/AddHouseIcon";

import { UserMenu } from "@/components/userMenu";
import { LogoLink } from "@/components/LogoLink";
import { SearchFormBar } from "./_searchFormBar/searchFormBar";
import { CategoryBar } from "@/layout/header/_categoryBar/categoryBar";

import {
  StaysButtonContextApi,
  StaysButtonContextData,
} from "./_lib/context/context";

import { RightNavigationMenuProps } from "./_lib/types";

import styles from "./header.module.scss";

const CenterNavigationMenu = ({ children }: { children: React.ReactNode }) => {
  const [staysButtonState, setStaysButtonState] = useState<boolean>(true);
  const [isCategoryChanged, setIsCategoryChanged] = useState<boolean>(false);

  const staysButtonContextData = useMemo(() => {
    return {
      staysButtonState: staysButtonState,
      isCategoryChanged: isCategoryChanged,
    };
  }, [staysButtonState, isCategoryChanged]);

  const staysButtonContextApi = useMemo(() => {
    return {
      setIsCategoryChanged: setIsCategoryChanged,
      setStaysButtonState: setStaysButtonState,
    };
  }, [setIsCategoryChanged, setStaysButtonState]);

  const handleClickOnExperienceButton = () => {
    setStaysButtonState(false);
    setIsCategoryChanged(true);
  };
  const handleClickOnStaysButton = () => {
    setStaysButtonState(true);
    setIsCategoryChanged(true);
  };

  return (
    <StaysButtonContextData.Provider value={staysButtonContextData}>
      <StaysButtonContextApi.Provider value={staysButtonContextApi}>
        <div className={styles.center_nagivation_menu}>
          <div className={styles.center_nagivation_menu_buttons}>
            <button
              className={styles.center_nagivation_menu_button}
              onClick={handleClickOnStaysButton}
              data-state={staysButtonState}
            >
              Stays
            </button>
            <button
              className={styles.center_nagivation_menu_button}
              onClick={handleClickOnExperienceButton}
              data-state={staysButtonState}
            >
              Experiences
            </button>
          </div>
          {children}
        </div>
      </StaysButtonContextApi.Provider>
    </StaysButtonContextData.Provider>
  );
};

const RightNavigationMenu = ({
  windowIsScrolledToTop,
  windowIsScrolled,
}: RightNavigationMenuProps) => {
  return (
    <motion.div
      className={styles.right_navigation_menu}
      initial={
        !windowIsScrolledToTop && windowIsScrolled
          ? { bottom: "-20dvh" }
          : { bottom: "2dvh" }
      }
      animate={
        !windowIsScrolledToTop && windowIsScrolled
          ? { bottom: "-20dvh" }
          : { bottom: "2dvh" }
      }
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <Link href={"manage/listings/create"}>
        <motion.button className={styles.right_navigation_button}>
          <AddHouseIcon className={styles.add_house_icon} />
        </motion.button>
      </Link>
      <UserMenu showArrow />
    </motion.div>
  );
};

export const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { isWidthEqual } = useSelector((state) => state.widthHandler);

  const [windowIsScrolled, setWindowIsScrolled] = useState<boolean>(false);
  const [windowIsScrolledToTop, setWindowIsScrolledToTop] =
    useState<boolean>(false);

  const isHomePage = usePathname() === "/";

  useEffect(() => {
    let prevScroll = window.scrollY;

    const trackWindowScroll = () => {
      if (window.scrollY > 0) {
        setWindowIsScrolled(true);
      } else if (window.scrollY === 0) {
        setWindowIsScrolled(false);
      }
      if (prevScroll > window.scrollY) {
        setWindowIsScrolledToTop(true);
      } else {
        setWindowIsScrolledToTop(false);
      }
      prevScroll = window.scrollY;
    };
    trackWindowScroll();

    window.addEventListener("scroll", trackWindowScroll);
    return () => {
      window.removeEventListener("scroll", trackWindowScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={styles.header_container}
      data-track={windowIsScrolled}
    >
      <motion.nav className={styles.navigation}>
        <LogoLink isShouldHide />

        {isWidthEqual[1080] ? (
          <>
            <button onClick={onOpen} className={styles.mobile_search_button}>
              <Search className={styles.mobile_search_icon} />{" "}
              <span className={styles.mobile_search_text}>Where do we go?</span>
            </button>
            <Modal
              isOpen={isOpen}
              onClose={onOpenChange}
              backdrop="blur"
              size="full"
            >
              <ModalContent>
                <CenterNavigationMenu>
                  <SearchFormBar
                    trackScrolled={windowIsScrolled}
                    onCloseCallBack={onOpenChange}
                  />
                </CenterNavigationMenu>
              </ModalContent>
            </Modal>
          </>
        ) : (
          <CenterNavigationMenu>
            <SearchFormBar trackScrolled={windowIsScrolled} />
          </CenterNavigationMenu>
        )}

        <RightNavigationMenu
          windowIsScrolledToTop={windowIsScrolledToTop}
          windowIsScrolled={windowIsScrolled}
        />
      </motion.nav>
      {isHomePage && <CategoryBar scrolled={windowIsScrolled} />}
    </header>
  );
};
