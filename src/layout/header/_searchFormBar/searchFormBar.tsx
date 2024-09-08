import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { motion } from "framer-motion";
import { Checkbox } from "@nextui-org/react";
import { today, getLocalTimeZone, parseDate } from "@internationalized/date";
import { DateValue, RangeCalendar, RangeValue } from "@nextui-org/calendar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { store } from "@/store";
import { getVerifiedListings } from "@/store/api/endpoints/listings/getVerifiedListings";
import { requestListingSearch } from "@/store/api/endpoints/listings/requestListingSearch";

import { Location } from "@/svgs/Location";
import { Search } from "@/svgs/Search";
import spinner from "@/assets/spinner.gif";

import { useDebounce } from "@/hooks/useDebounce";

import { ModalPanel } from "@/components/modalPanel";
import { Counter } from "@/components/counter";

import {
  DateFormatingMonthDay,
  isDateValueEqual,
  ParseLocalStorageDates,
} from "@/helpers/dateManagment";
import { ErrorHandler } from "@/helpers/errorHandler";
import { getSearchSelection } from "../_lib/getSearchSelection";
import { getCountriesByRequest } from "../_lib/getCountriesByRequest";
import { updateAndStoreQueryParams } from "@/helpers/paramsManagment";
import { regions } from "@/information/data";

import {
  regionResponceType,
  regionsType,
  SearchFormBarProps,
} from "../_lib/types";
import { SEARCH_PARAM_KEYS } from "../_lib/enums";
import { TypesOfSelections } from "@/_utilities/enums";

import styles from "./search_form_bar.module.scss";

export const SearchFormBar: React.FC<SearchFormBarProps> = ({
  staysButtonState,
  isCategoryChanged,
  setIsCategoryChanged,
  trackScrolled,
  isMobile,
  onCloseCallBack,
}) => {
  const searchBarRef = useRef<HTMLFormElement | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [triggeredSelection, setTriggeredSelection] =
    useState<TypesOfSelections>(TypesOfSelections.UNSELECTED);

  const [userDateSelection, setUserDateSelection] = useState<
    RangeValue<DateValue>
  >({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  });

  const [isNewDateSelected, setIsNewDateSelected] = useState<boolean>(false);

  const [regionSelection, setRegionSelection] = useState<{
    value: string | null;
    country: string | null;
    city: string | null;
  }>({
    value: null,
    country: null,
    city: null,
  });
  const [responseForRegion, setResponseForRegion] = useState<[]>([]);

  const [amoutOfGuests, setAmoutOfGuests] = useState<number>(1);
  const [includePets, setIncludePets] = useState<boolean>(false);

  // CONDITIONS
  const isDefaultDate =
    isDateValueEqual(userDateSelection) && !isNewDateSelected;

  const isDateSelection = triggeredSelection === TypesOfSelections.DATE;

  const isDateExperiencesSelectionCheckIn =
    triggeredSelection === TypesOfSelections.DATE_EXPERIENCES_CHECKIN;

  const isDateExperiencesSelectionCheckOut =
    triggeredSelection === TypesOfSelections.DATE_EXPERIENCES_CHECKOUT;

  const isRegions = regions.some(
    (region) => region.region === regionSelection?.value
  );

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
      const res = await getCountriesByRequest(regionSelection.value!);
      setResponseForRegion(res.data);
    } catch (error) {
      toast.info("Too many requests at the same time", {
        position: "bottom-center",
        action: {
          label: "Close",
          onClick: (e) => requestSearch(e),
        },
      });
      setRegionSelection({
        value: "",
        country: null,
        city: null,
      });
    }
  };
  const delaiedDataResponse = useDebounce(getData, 500);

  const getRegionSelectionValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      delaiedDataResponse();

      setRegionSelection({
        value: e.target.value,
        country: null,
        city: null,
      });
    } else {
      setRegionSelection({
        value: null,
        country: null,
        city: null,
      });
    }
  };

  const handleSelectCheckIn = (date: DateValue, type: string) => {
    if (
      type === TypesOfSelections.DATE_EXPERIENCES_CHECKIN ||
      type === TypesOfSelections.DATE
    ) {
      setUserDateSelection({
        ...userDateSelection,
        start: date,
      });
      setTriggeredSelection(TypesOfSelections.DATE_EXPERIENCES_CHECKOUT);
    }
  };

  const handleBookingCalendarSelections = (value: RangeValue<DateValue>) => {
    if (isDateSelection) {
      setUserDateSelection({
        ...userDateSelection,
        start: value.start,
      });
    } else if (value.start.toString() !== value.end.toString()) {
      updateAndStoreQueryParams({
        updatedParams: {
          [SEARCH_PARAM_KEYS.SEARCH_DATE]: JSON.stringify(value),
        },
        pathname,
        params,
        router,
      });
      setUserDateSelection({
        ...userDateSelection,
        end: value.end,
      });
      setIsNewDateSelected(true);
      setTriggeredSelection(TypesOfSelections.GUEST);
    } else {
      toast(
        <div className="toast">
          🫣 Selected dates cannot be the same. The minimum stay is one night.
        </div>
      );
      setIsNewDateSelected(false);
      setUserDateSelection({
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({ weeks: 1 }),
      });
    }
    return null;
  };

  const requestSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const searchSelection = getSearchSelection(params, SEARCH_PARAM_KEYS);
      console.log(searchSelection, "searchSelection");
      const { data: res, error } = await store.dispatch(
        requestListingSearch.initiate({
          search_place: searchSelection[SEARCH_PARAM_KEYS.SEARCH_PLACE]
            ? JSON.parse(searchSelection[SEARCH_PARAM_KEYS.SEARCH_PLACE])
            : null,
          search_date: searchSelection[SEARCH_PARAM_KEYS.SEARCH_DATE]
            ? ParseLocalStorageDates(
                searchSelection[SEARCH_PARAM_KEYS.SEARCH_DATE]
              )
            : null,
          search_amountOfGuests: searchSelection[
            SEARCH_PARAM_KEYS.SEARCH_AMOUNT_OF_GUESTS
          ]
            ? JSON.parse(
                searchSelection[SEARCH_PARAM_KEYS.SEARCH_AMOUNT_OF_GUESTS]
              )
            : null,
          search_includePets: searchSelection[
            SEARCH_PARAM_KEYS.SEARCH_INCLUDE_PETS
          ]
            ? JSON.parse(searchSelection[SEARCH_PARAM_KEYS.SEARCH_INCLUDE_PETS])
            : null,
          search_category: searchSelection[SEARCH_PARAM_KEYS.SEARCH_CATEGORY]
            ? JSON.parse(searchSelection[SEARCH_PARAM_KEYS.SEARCH_CATEGORY])
            : null,
        })
      );

      if (error || !res) ErrorHandler(error as Error);

      setTriggeredSelection(TypesOfSelections.UNSELECTED);
      onCloseCallBack && onCloseCallBack();
    } catch (error) {
      await store.dispatch(getVerifiedListings.initiate());
      toast.error("We couldn't process your request. Please try again", {
        action: {
          label: "Try again",
          onClick: (e) => requestSearch(e),
        },
      });
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

  useEffect(() => {
    if (amoutOfGuests) {
      updateAndStoreQueryParams({
        updatedParams: {
          [SEARCH_PARAM_KEYS.SEARCH_AMOUNT_OF_GUESTS]:
            JSON.stringify(amoutOfGuests),
        },
        pathname,
        params,
        router,
      });
    }
  }, [amoutOfGuests, params, pathname, router]);

  useEffect(() => {
    if (includePets) {
      updateAndStoreQueryParams({
        updatedParams: { pets: JSON.stringify(includePets) },
        pathname,
        params,
        router,
      });
    }
  }, [includePets, params, pathname, router]);

  useEffect(() => {
    Object.values(SEARCH_PARAM_KEYS).forEach((key) => {
      const storedParams = params.get(key);

      if (!storedParams) return;
      switch (key) {
        case SEARCH_PARAM_KEYS.SEARCH_PLACE: {
          setRegionSelection({
            ...JSON.parse(storedParams),
          });
          break;
        }

        case SEARCH_PARAM_KEYS.SEARCH_DATE: {
          setIsNewDateSelected(true);
          setUserDateSelection({
            start: ParseLocalStorageDates(storedParams!).start,
            end: ParseLocalStorageDates(storedParams!).end,
          });
          break;
        }
        case SEARCH_PARAM_KEYS.SEARCH_AMOUNT_OF_GUESTS: {
          setAmoutOfGuests(JSON.parse(storedParams!));
          break;
        }
        case SEARCH_PARAM_KEYS.SEARCH_INCLUDE_PETS: {
          setIncludePets(JSON.parse(storedParams!));
          break;
        }
      }
    });
  }, [params]);

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
                  {!regionSelection.value || isRegions ? (
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
                                if (prev.value !== value) {
                                  updateAndStoreQueryParams({
                                    updatedParams: {
                                      [SEARCH_PARAM_KEYS.SEARCH_PLACE]:
                                        JSON.stringify({ value: value }),
                                    },
                                    pathname,
                                    params,
                                    router,
                                  });
                                  return {
                                    value: value,
                                    city: null,
                                    country: null,
                                  };
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

                                      if (prev.value !== value) {
                                        updateAndStoreQueryParams({
                                          updatedParams: {
                                            [SEARCH_PARAM_KEYS.SEARCH_PLACE]:
                                              JSON.stringify({
                                                city: countires.city,
                                                country: countires.country,
                                                value: formattedValue,
                                              }),
                                          },
                                          pathname,
                                          params,
                                          router,
                                        });

                                        return {
                                          value: formattedValue,
                                          city: countires.city,
                                          country: countires.country,
                                        };
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
            value={regionSelection?.value!}
          />
          <label
            htmlFor="searchRegionInput"
            className={styles.search_bar_label}
          >
            Which City you heading?
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
                  value={userDateSelection}
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
                  value={
                    isDefaultDate
                      ? "Add date"
                      : DateFormatingMonthDay(userDateSelection.start)
                  }
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
                  value={
                    isDefaultDate
                      ? "Add date"
                      : DateFormatingMonthDay(userDateSelection.end)
                  }
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
                      className={styles.modal_menu_pets_checkbox_input}
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
