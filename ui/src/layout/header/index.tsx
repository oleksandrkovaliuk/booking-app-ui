"use client";
import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";
import { Logo } from "@/svgs/Logo";
import Link from "next/link";
import { SearchFormBar } from "./searchFormBar";

export const Header = () => {
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
    <header className={styles.header_container}>
      <nav className={styles.top_navigation}>
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
        </div>
        <div className={styles.right_navigation_menu}>
          <span>hello</span>
        </div>
      </nav>
      <SearchFormBar
        staysButtonState={staysButtonState}
        isCategoryChanged={isCategoryChanged}
        setIsCategoryChanged={setIsCategoryChanged}
      />
    </header>
  );
};
