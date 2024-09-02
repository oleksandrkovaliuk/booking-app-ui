import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Checkbox } from "@nextui-org/react";
import { DateValue, RangeCalendar, RangeValue } from "@nextui-org/calendar";

import { useSelector } from "@/store";
import {
  setCheckIn,
  setCheckOut,
  setResetDate,
} from "@/store/slices/userDateSelectionSlice";
import { GlobalCalendarState } from "@/store/slices/userDateSelectionSlice/type";

import { Location } from "@/svgs/Location";
import { Search } from "@/svgs/Search";
import spinner from "@/assets/spinner.gif";

import { ModalPanel } from "@/components/modalPanel";
import { Counter } from "@/components/counter";
import { getCountriesByRequest } from "./getCountriesByRequest";
import { useDebounce } from "@/hooks/useDebounce";
import { regions } from "@/information/data";
import { DateFormatingMonthDay } from "@/helpers/dateManagment";

import { regionResponceType, regionsType, SearchFormBarProps } from "../types";
import { TypesOfSelections } from "@/_utilities/enums";
import { today, getLocalTimeZone } from "@internationalized/date";

import styles from "./search_form_bar.module.scss";

export const SearchFormBar: React.FC<SearchFormBarProps> = ({
  staysButtonState,
  isCategoryChanged,
  setIsCategoryChanged,
  trackScrolled,
  isMobile,
  onCloseCallBack,
}) => {
  const dispatch = useDispatch();
  const searchBarRef = useRef<HTMLFormElement | null>(null);
  const userDateSelection = useSelector((state) => state.userDateSelection);

  const [triggeredSelection, setTriggeredSelection] =
    useState<TypesOfSelections>(TypesOfSelections.UNSELECTED);

  const [regionSelection, setRegionSelection] = useState<string>("");
  const [responseForRegion, setResponseForRegion] = useState<[]>([]);

  const [amoutOfGuests, setAmoutOfGuests] = useState<number>(1);
  const [includePets, setIncludePets] = useState<boolean>(false);

  const isDateSelection = triggeredSelection === TypesOfSelections.DATE;

  const isDateExperiencesSelectionCheckIn =
    triggeredSelection === TypesOfSelections.DATE_EXPERIENCES_CHECKIN;

  const isDateExperiencesSelectionCheckOut =
    triggeredSelection === TypesOfSelections.DATE_EXPERIENCES_CHECKOUT;

  const isRegions = regions.some((region) => region.region === regionSelection);
  const isSearchSettedUp =
    regionSelection.length ||
    userDateSelection.start ||
    userDateSelection.end ||
    amoutOfGuests ||
    includePets;

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
      setRegionSelection("");
    }
  };
  const delaiedDataResponse = useDebounce(getData, 500);

  const getRegionSelectionValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      delaiedDataResponse();
      setRegionSelection(e.target.value);
    } else {
      setRegionSelection("");
    }
  };

  const handleSelectCheckIn = (date: DateValue, type: string) => {
    if (
      type === TypesOfSelections.DATE_EXPERIENCES_CHECKIN ||
      type === TypesOfSelections.DATE
    ) {
      dispatch(setCheckIn(date));
      setTriggeredSelection(TypesOfSelections.DATE_EXPERIENCES_CHECKOUT);
    }
  };

  const handleBookingCalendarSelections = (value: GlobalCalendarState) => {
    if (isDateSelection) {
      dispatch(setCheckIn(value.start));
    } else if (value.start.toString() !== value.end.toString()) {
      dispatch(setCheckOut(value.end));
      setTriggeredSelection(TypesOfSelections.GUEST);
    } else {
      toast(
        <div className="toast ">
          🫣 Selected dates cannot be the same. The minimum stay is one night.
        </div>
      );
      dispatch(setResetDate());
    }
    return null;
  };

  const requestSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSearchSettedUp) {
      setTriggeredSelection(TypesOfSelections.UNSELECTED);
      onCloseCallBack && onCloseCallBack();
      console.log({
        regionSelection: regionSelection,
        checkInInputValue: userDateSelection.start,
        checkOutInputValue: userDateSelection.end,
        amoutOfGuests: amoutOfGuests,
        includePets: includePets,
      });
    } else {
      console.log("Search not setted up");
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
        <button
          className={styles.header_active_background}
          onClick={handleClearAllTriggeredSelections}
        />
      )}
      <motion.form
        ref={searchBarRef}
        className={styles.search_bar_container}
        initial={{ marginTop: "64px" }}
        animate={trackScrolled ? { marginTop: "0" } : { marginTop: "64px" }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        data-triggered={triggeredSelection !== ""}
        data-is-mobile={isMobile}
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
                width={50}
                className={styles.modal_menu}
              >
                <div
                  className={styles.search_region_modal}
                  style={{
                    backgroundImage: `url(${spinner})`,
                    margin: "auto",
                  }}
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
                            (countires: regionResponceType) => {
                              const formattedValue =
                                countires.city.length +
                                  countires.country.length >
                                20
                                  ? `${countires.city}, ${countires.countryCode}`
                                  : `${countires.city}, ${countires.country}`;
                              return (
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
                                      const value = formattedValue;
                                      if (prev !== value) {
                                        return formattedValue;
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
                                    {formattedValue}
                                  </span>
                                </button>
                              );
                            }
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
                triggeredElementLeft={50}
                gap={15}
                className={styles.modal_menu}
                centered_items={true}
                centered_modal={true}
              >
                <RangeCalendar
                  aria-label="Booking dates"
                  visibleMonths={isMobile ? 1 : 2}
                  onChange={(value: RangeValue<DateValue>) =>
                    handleBookingCalendarSelections(value)
                  }
                  onFocusChange={(value: DateValue) => {
                    handleSelectCheckIn(value, triggeredSelection);
                  }}
                  color="primary"
                  minValue={today(getLocalTimeZone())}
                  value={
                    userDateSelection &&
                    (userDateSelection as RangeValue<DateValue>)
                  }
                />
              </ModalPanel>
            )}
          {staysButtonState && !isMobile ? (
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
                  value={DateFormatingMonthDay(userDateSelection.start)}
                  readOnly
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
                  value={DateFormatingMonthDay(userDateSelection.end)}
                  readOnly
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
                value={
                  userDateSelection.start || userDateSelection.end
                    ? `${DateFormatingMonthDay(userDateSelection.start)} ${
                        userDateSelection.start &&
                        userDateSelection.end &&
                        " - "
                      } ${DateFormatingMonthDay(userDateSelection.end)}`
                    : ""
                }
                readOnly
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
                width={50}
                className={styles.modal_menu}
              >
                <div className={styles.modal_menu_guest_settings}>
                  <div className={styles.modal_menu_guest_settings_text}>
                    <span className={styles.modal_menu_guest_settings_title}>
                      Guest
                    </span>
                    <p className={styles.modal_menu_guest_settings_note}>
                      Including children
                    </p>
                  </div>
                  <Counter
                    counter={amoutOfGuests}
                    setCounter={setAmoutOfGuests}
                  />
                </div>
                <div className={styles.modal_menu_guest_settings}>
                  <div className={styles.modal_menu_guest_settings_text}>
                    <span className={styles.modal_menu_guest_settings_title}>
                      Pets
                    </span>
                    <p className={styles.modal_menu_guest_settings_note}>
                      Include pets
                    </p>
                  </div>
                  <div className={styles.modal_menu_pets_checkbox}>
                    <Checkbox
                      isSelected={includePets}
                      onValueChange={setIncludePets}
                      isDisabled={amoutOfGuests === 0}
                    />
                  </div>
                </div>
              </ModalPanel>
            )}
          <input
            type="text"
            id="Guests"
            className={styles.search_bar_input}
            placeholder="Add guests"
            value={
              amoutOfGuests
                ? `${amoutOfGuests} guests ${includePets ? ", with pets" : ""}`
                : ""
            }
            readOnly
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
          onClick={requestSearch}
        >
          <Search className={styles.search_icon} />
          <span className={styles.search_text}>search</span>
        </motion.button>
      </motion.form>
    </>
  );
};
