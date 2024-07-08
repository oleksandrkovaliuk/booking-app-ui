"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./search_form_bar.module.scss";
import { Search } from "@/svgs/Search";
import { motion } from "framer-motion";
import { ModalPanel } from "@/components/modalPanel";
import { TypesOfSelections } from "@/utilities/enums";
import { getCountriesByRequest } from "./getCountriesByRequest";
import spinner from "@/content/spinner.gif";
import { useDebounce } from "@/hooks/useDebounce";
import { Location } from "@/svgs/Location";
import Image, { StaticImageData } from "next/image";
import { regions } from "@/information/data";

interface SearchFormBarProps {
  staysButtonState: boolean;
  isCategoryChanged: boolean;
  setIsCategoryChanged: React.Dispatch<React.SetStateAction<boolean>>;
  trackScrolled: boolean;
}

interface regionResponceType {
  id: number;
  city: string;
  country: string;
  countryCode: string;
}
interface regionsType {
  id: number;
  region: string;
  map: StaticImageData;
}
export const SearchFormBar: React.FC<SearchFormBarProps> = ({
  staysButtonState,
  isCategoryChanged,
  setIsCategoryChanged,
  trackScrolled,
}) => {
  const searchBarRef = useRef<HTMLFormElement>(null);
  const [triggeredSelection, setTriggeredSelection] =
    useState<TypesOfSelections>(null || TypesOfSelections.UNSELECTED);
  const [regionSelection, setRegionSelection] = useState<string>("");
  const [responseForRegion, setResponseForRegion] = useState<[]>(null || []);

  const isDateSelection = triggeredSelection === TypesOfSelections.DATE;

  const isDateExperiencesSelectionCheckIn =
    triggeredSelection === TypesOfSelections.DATE_EXPERIENCES_CHECKIN;

  const isDateExperiencesSelectionCheckOut =
    triggeredSelection === TypesOfSelections.DATE_EXPERIENCES_CHECKOUT;

  const isRegions = regions.some((region) => region.region === regionSelection);

  const handleClearAllTriggeredSelections = () => {
    setTriggeredSelection(TypesOfSelections.UNSELECTED);
  };

  const handlePopUpMenuOpening = (
    e: React.MouseEvent,
    type: TypesOfSelections
  ) => {
    e.preventDefault();
    setIsCategoryChanged(false);
    setTriggeredSelection(type);
  };

  const getData = async () => {
    try {
      const res = await getCountriesByRequest(regionSelection);
      setResponseForRegion(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const delaiedDataResponse = useDebounce(getData, 400);

  const getRegionSelectionValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      delaiedDataResponse();
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
      <motion.form
        ref={searchBarRef}
        className={styles.search_bar_container}
        data-triggered={triggeredSelection !== ""}
        initial={{ marginTop: "64px" }}
        animate={trackScrolled ? { marginTop: "0" } : { marginTop: "64px" }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
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
                width={145}
                className={styles.modal_menu}
              >
                <div
                  className={styles.search_region_modal}
                  style={{ backgroundImage: `url(${spinner})`, margin: "auto" }}
                >
                  {!regionSelection || isRegions ? (
                    <div className={styles.regions_cards_container}>
                      <h2 className={styles.search_region_modal_title}>
                        Search by region
                      </h2>
                      <div className={styles.region_card_container}>
                        {regions.map((region: regionsType) => (
                          <div
                            className={styles.region_card}
                            key={region.id}
                            onClick={() =>
                              setRegionSelection((prev) => {
                                setTriggeredSelection(
                                  staysButtonState
                                    ? TypesOfSelections.DATE_EXPERIENCES_CHECKIN
                                    : TypesOfSelections.DATE
                                );
                                const value = region.region;
                                if (prev !== value) {
                                  return value;
                                }
                                return prev;
                              })
                            }
                          >
                            <Image
                              src={region.map}
                              alt={region.region}
                              className={styles.region_card_img}
                            />
                            <p className={styles.region_card_title}>
                              {region.region}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      {!responseForRegion?.length ? (
                        <div className={styles.spinner} />
                      ) : (
                        <div
                          className={styles.search_results_selections_container}
                        >
                          {responseForRegion?.map(
                            (countires: regionResponceType) => (
                              <button
                                className={styles.countrie_responce_block}
                                key={countires.id}
                                onClick={() =>
                                  setRegionSelection((prev) => {
                                    setTriggeredSelection(
                                      staysButtonState
                                        ? TypesOfSelections.DATE_EXPERIENCES_CHECKIN
                                        : TypesOfSelections.DATE
                                    );
                                    const value = countires.city;
                                    if (prev !== value) {
                                      return value;
                                    }
                                    return prev;
                                  })
                                }
                              >
                                <div
                                  className={
                                    styles.countrie_responce_location_icon
                                  }
                                >
                                  <Location />
                                </div>
                                <span
                                  className={styles.countrie_responce_value}
                                >
                                  {countires.city.length +
                                    countires.country.length >
                                  20
                                    ? `${countires.city}, ${countires.countryCode}`
                                    : `${countires.city}, ${countires.country}`}
                                </span>
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </>
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
            value={regionSelection}
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
                width={100}
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
                triggeredElementRight={0}
                gap={15}
                width={145}
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
      </motion.form>
    </>
  );
};
