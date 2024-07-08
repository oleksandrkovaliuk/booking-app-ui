"use client";
import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";
import { Logo } from "@/svgs/Logo";
import Link from "next/link";
import { SearchFormBar } from "./searchFormBar/searchFormBar";
import { motion } from "framer-motion";
export const Header = () => {
  const [staysButtonState, setStaysButtonState] = useState<boolean>(true);
  const [isCategoryChanged, setIsCategoryChanged] = useState<boolean>(false);
  const [windowIsScrolled, setWindowIsScrolled] = useState<boolean>(false);
  const handleClickOnExperienceButton = () => {
    setStaysButtonState(false);
    setIsCategoryChanged(true);
  };
  const handleClickOnStaysButton = () => {
    setStaysButtonState(true);
    setIsCategoryChanged(true);
  };

  useEffect(() => {
    const trackWindowScroll = () => {
      if (window.scrollY > 0) {
        setWindowIsScrolled(true);
      } else if (window.scrollY === 0) {
        setWindowIsScrolled(false);
      }
    };
    window.addEventListener("scroll", trackWindowScroll);
    return () => {
      window.removeEventListener("scroll", trackWindowScroll);
    };
  }, []);
  return (
    <header className={styles.header_container} data-track={windowIsScrolled}>
      <motion.nav className={styles.top_navigation}>
        <Link href={"/"} className={styles.logo}>
          <Logo />
        </Link>
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
          />
        </div>
        <div className={styles.right_navigation_menu}>
          <span>hello</span>
        </div>
      </motion.nav>
    </header>
  );
};
