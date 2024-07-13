"use client";
import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";
import { Logo } from "@/svgs/Logo";
import Link from "next/link";
import { SearchFormBar } from "./searchFormBar/searchFormBar";
import { motion } from "framer-motion";
import { UserIcon } from "@/svgs/UserIcon";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { LanguagesIcon } from "@/svgs/Languages";
import { AddHouseIcon } from "@/svgs/AddHouseIcon";
import { Search } from "@/svgs/Search";
interface CenterNavigationMenuProps {
  windowIsScrolled: boolean;
  mobile: boolean;
  onCloseCallBack?: () => void;
}

interface RightNavigationMenuProps
  extends Omit<CenterNavigationMenuProps, "onCloseCallBack"> {
  windowIsScrolledToTop: boolean;
}

const CenterNavigationMenu = ({
  windowIsScrolled,
  mobile,
  onCloseCallBack,
}: CenterNavigationMenuProps) => {
  const [staysButtonState, setStaysButtonState] = useState<boolean>(true);
  const [isCategoryChanged, setIsCategoryChanged] = useState<boolean>(false);

  const handleClickOnExperienceButton = () => {
    setStaysButtonState(false);
    setIsCategoryChanged(true);
  };
  const handleClickOnStaysButton = () => {
    setStaysButtonState(true);
    setIsCategoryChanged(true);
  };
  return (
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
      <SearchFormBar
        staysButtonState={staysButtonState}
        isCategoryChanged={isCategoryChanged}
        setIsCategoryChanged={setIsCategoryChanged}
        trackScrolled={windowIsScrolled}
        isMobile={mobile}
        onCloseCallBack={onCloseCallBack}
      />
    </div>
  );
};

const RightNavigationMenu = ({
  mobile,
  windowIsScrolledToTop,
  windowIsScrolled,
}: RightNavigationMenuProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onOpenChange} backdrop="blur" size="md">
        <ModalContent>hello</ModalContent>
      </Modal>
      <motion.div
        className={styles.right_navigation_menu}
        data-is-mobile={mobile}
        initial={
          !windowIsScrolledToTop && windowIsScrolled
            ? { bottom: "-20dvh" }
            : { bottom: "0dvh" }
        }
        animate={
          !windowIsScrolledToTop && windowIsScrolled
            ? { bottom: "-20dvh" }
            : { bottom: "0dvh" }
        }
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Link href={"/create/post"}>
          <motion.button className={styles.right_navigation_button}>
            <AddHouseIcon />
          </motion.button>
        </Link>
        <motion.button
          onClick={onOpen}
          className={styles.right_navigation_button}
        >
          <LanguagesIcon />
        </motion.button>
      </motion.div>
    </>
  );
};
export const Header = () => {
  const [windowIsScrolled, setWindowIsScrolled] = useState<boolean>(false);
  const [windowIsScrolledToTop, setWindowIsScrolledToTop] =
    useState<boolean>(false);
  const [mobile, setMobile] = useState<boolean>(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
    if (window.innerWidth < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    window.addEventListener("scroll", trackWindowScroll);
    return () => {
      window.removeEventListener("scroll", trackWindowScroll);
    };
  }, []);

  return (
    <header className={styles.header_container} data-track={windowIsScrolled}>
      <motion.nav className={styles.navigation}>
        <Link href={"/"} className={styles.logo}>
          <Logo />
        </Link>
        {mobile ? (
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
                <CenterNavigationMenu
                  windowIsScrolled={windowIsScrolled}
                  mobile={mobile}
                  onCloseCallBack={onOpenChange}
                />
              </ModalContent>
            </Modal>
          </>
        ) : (
          <CenterNavigationMenu
            windowIsScrolled={windowIsScrolled}
            mobile={mobile}
          />
        )}
        <RightNavigationMenu
          mobile={mobile}
          windowIsScrolledToTop={windowIsScrolledToTop}
          windowIsScrolled={windowIsScrolled}
        />
      </motion.nav>
    </header>
  );
};
