"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./search_form_bar.module.scss";
import { Search } from "@/svgs/Search";
import { motion } from "framer-motion";
import { ModalPanel } from "@/components/modalPanel";
import { TypesOfSelections } from "@/utilities/enums";

interface SearchFormBarProps {
  staysButtonState: boolean;
  isCategoryChanged: boolean;
  setIsCategoryChanged: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SearchFormBar: React.FC<SearchFormBarProps> = ({
  staysButtonState,
  isCategoryChanged,
  setIsCategoryChanged,
}) => {
  const searchBarRef = useRef<HTMLFormElement>(null);
  const [triggeredSelection, setTriggeredSelection] =
    useState<TypesOfSelections>(null || TypesOfSelections.UNSELECTED);
  const [regionSelection, setRegionSelection] = useState<string>("");
  const isDateSelection = triggeredSelection === TypesOfSelections.DATE;

  const isDateExperiencesSelectionCheckIn =
    triggeredSelection === TypesOfSelections.DATE_EXPERIENCES_CHECKIN;

  const isDateExperiencesSelectionCheckOut =
    triggeredSelection === TypesOfSelections.DATE_EXPERIENCES_CHECKOUT;
  const handleClearAllTriggeredSelections = () => {
    setTriggeredSelection(TypesOfSelections.UNSELECTED);
  };
  const handlePopUpMenuOpening = (
    e: React.MouseEvent,
    type: TypesOfSelections
  ) => {
    e.preventDefault();
    setTriggeredSelection(type);
  };
  const getRegionSelectionValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setRegionSelection(e.target.value);
    } else {
      setRegionSelection("");
    }
  };
  useEffect(() => {
    if (
      isDateExperiencesSelectionCheckIn ||
      isDateSelection ||
      isDateExperiencesSelectionCheckOut
    ) {
      setIsCategoryChanged(false);
    }
  }, [
    isDateExperiencesSelectionCheckIn,
    isDateExperiencesSelectionCheckOut,
    isDateSelection,
    setIsCategoryChanged,
  ]);
  return (
    <>
      {triggeredSelection !== TypesOfSelections.UNSELECTED && (
        <div
          className={styles.header_active_background}
          onClick={handleClearAllTriggeredSelections}
        />
      )}
      <form
        ref={searchBarRef}
        className={styles.search_bar_container}
        data-triggered={triggeredSelection !== ""}
      >
        <div
          role="button"
          className={styles.search_bar_input_container}
          onClick={(event) =>
            handlePopUpMenuOpening(event, TypesOfSelections.WHERE)
          }
          data-triggered={triggeredSelection === TypesOfSelections.WHERE}
        >
          {triggeredSelection === TypesOfSelections.WHERE &&
            searchBarRef.current && (
              <ModalPanel
                triggeredElementHeight={
                  searchBarRef?.current?.getBoundingClientRect().height
                }
                triggeredElementLeft={0}
                gap={15}
                className={styles.modal_menu}
              >
                <div className={styles.search_region_modal}>
                  <h2 className={styles.search_region_modal_title}>
                    Search by region
                  </h2>

                  {!regionSelection ? (
                    <div className={styles.regions_cards_container}>
                      <div className={styles.region_card}>region 1</div>
                      <div className={styles.region_card}>region 2</div>
                      <div className={styles.region_card}>region 3</div>
                      <div className={styles.region_card}>region 4</div>
                      <div className={styles.region_card}>region 5</div>
                    </div>
                  ) : (
                    <div className={styles.search_results_selections_container}>
                      <span>...loading</span>
                    </div>
                  )}
                </div>
              </ModalPanel>
            )}
          <input
            type="text"
            id="searchRegionInput"
            className={styles.search_bar_input}
            placeholder="Search destinations"
            onChange={getRegionSelectionValue}
          />
          <label
            htmlFor="searchRegionInput"
            className={styles.search_bar_label}
          >
            Where
          </label>
        </div>
        <div
          className={styles.search_bar_input_dates}
          data-state={staysButtonState}
        >
          {(isDateSelection ||
            isDateExperiencesSelectionCheckIn ||
            isDateExperiencesSelectionCheckOut) &&
            searchBarRef.current &&
            !isCategoryChanged && (
              <ModalPanel
                triggeredElementHeight={
                  searchBarRef?.current?.getBoundingClientRect().height
                }
                triggeredElementLeft={0}
                gap={15}
                className={styles.modal_menu}
              >
                {staysButtonState ? <div>stays</div> : <div>expensises</div>}
              </ModalPanel>
            )}
          {staysButtonState ? (
            <>
              <div
                className={styles.search_bar_input_container}
                onClick={(event) =>
                  handlePopUpMenuOpening(
                    event,
                    TypesOfSelections.DATE_EXPERIENCES_CHECKIN
                  )
                }
                data-triggered={
                  isDateExperiencesSelectionCheckIn && !isCategoryChanged
                }
              >
                <input
                  type="text"
                  id="dateInput"
                  className={styles.search_bar_input}
                  placeholder="Add dates"
                />
                <label htmlFor="dateInput" className={styles.search_bar_label}>
                  Check in
                </label>
              </div>
              <div
                className={styles.search_bar_input_container}
                onClick={(event) =>
                  handlePopUpMenuOpening(
                    event,
                    TypesOfSelections.DATE_EXPERIENCES_CHECKOUT
                  )
                }
                data-triggered={
                  isDateExperiencesSelectionCheckOut && !isCategoryChanged
                }
              >
                <input
                  type="text"
                  id="dateInput"
                  className={styles.search_bar_input}
                  placeholder="Add dates"
                />
                <label htmlFor="dateInput" className={styles.search_bar_label}>
                  Check out
                </label>
              </div>
            </>
          ) : (
            <div
              className={styles.search_bar_input_container}
              onClick={(event) =>
                handlePopUpMenuOpening(event, TypesOfSelections.DATE)
              }
              data-triggered={isDateSelection && !isCategoryChanged}
            >
              <input
                type="text"
                id="dateInput"
                className={styles.search_bar_input}
                placeholder="Add dates"
              />
              <label htmlFor="dateInput" className={styles.search_bar_label}>
                Date
              </label>
            </div>
          )}
        </div>

        <div
          className={styles.search_bar_input_container}
          onClick={(event) =>
            handlePopUpMenuOpening(event, TypesOfSelections.GUEST)
          }
          data-triggered={triggeredSelection === TypesOfSelections.GUEST}
        >
          {triggeredSelection === TypesOfSelections.GUEST &&
            searchBarRef.current && (
              <ModalPanel
                triggeredElementHeight={
                  searchBarRef?.current?.getBoundingClientRect().height
                }
                triggeredElementLeft={0}
                gap={15}
                className={styles.modal_menu}
              >
                <div>qdwa</div>
                <div>dasdas</div>
              </ModalPanel>
            )}
          <input
            type="text"
            id="Guests"
            className={styles.search_bar_input}
            placeholder="Add guests"
          />
          <label htmlFor="Guests" className={styles.search_bar_label}>
            Who
          </label>
        </div>

        <motion.button
          type="submit"
          className={styles.search_bar_button}
          data-triggered={triggeredSelection !== ""}
          animate={
            triggeredSelection !== ""
              ? { maxWidth: "110px", gap: "7.5px" }
              : { maxWidth: "50px", gap: "15px" }
          }
        >
          <Search className={styles.search_icon} />
          <span className={styles.search_text}>search</span>
        </motion.button>
      </form>
    </>
  );
};
