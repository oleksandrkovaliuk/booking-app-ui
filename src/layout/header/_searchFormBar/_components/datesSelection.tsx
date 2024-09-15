import React, { memo, useEffect, useState } from "react";
import { toast } from "sonner";
import { today, getLocalTimeZone } from "@internationalized/date";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DateValue, RangeCalendar, RangeValue } from "@nextui-org/calendar";

import {
  useStaysButtonContextApi,
  useStaysButtonContextData,
  useTriggeredSelectionApi,
  useTriggeredSelectionData,
} from "../../_lib/context/context";

import { ModalPanel } from "@/components/modalPanel";

import {
  DateFormatingMonthDay,
  isDateValueEqual,
  ParseLocalStorageDates,
} from "@/helpers/dateManagment";
import { AssignNewQueryParams } from "@/helpers/paramsManagment";
import { ClearInputSelectionButton } from "./clearInputSelection";

import { SelectionComponentsProps } from "./type";
import { SEARCH_PARAM_KEYS } from "../../_lib/enums";
import { TypesOfSelections } from "@/_utilities/enums";

import styles from "../search_form_bar.module.scss";

const DatesSelection: React.FC<SelectionComponentsProps> = ({
  searchBarRef,
  handlePopUpMenuOpening,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const { setTriggeredSelection } = useTriggeredSelectionApi();
  const { triggeredSelection } = useTriggeredSelectionData();

  const { staysButtonState, isCategoryChanged } = useStaysButtonContextData();
  const { setIsCategoryChanged } = useStaysButtonContextApi();

  const [userDateSelection, setUserDateSelection] = useState<
    RangeValue<DateValue>
  >({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  });

  const [isNewDateSelected, setIsNewDateSelected] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const isDefaultDate =
    isDateValueEqual(userDateSelection) && !isNewDateSelected;

  const isDateSelection = triggeredSelection === TypesOfSelections.DATE;

  const isDateExperiencesSelectionCheckIn =
    triggeredSelection === TypesOfSelections.DATE_EXPERIENCES_CHECKIN;

  const isDateExperiencesSelectionCheckOut =
    triggeredSelection === TypesOfSelections.DATE_EXPERIENCES_CHECKOUT;

  const isToggleModal =
    (isDateSelection ||
      isDateExperiencesSelectionCheckIn ||
      isDateExperiencesSelectionCheckOut) &&
    searchBarRef.current &&
    !isCategoryChanged;

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
      AssignNewQueryParams({
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

  const handleClearDateSelection = (
    e: React.MouseEvent,
    type: "checkIn" | "checkOut" | "all"
  ) => {
    e.preventDefault();

    if (type === "checkIn") {
      AssignNewQueryParams({
        updatedParams: {
          [SEARCH_PARAM_KEYS.SEARCH_DATE]: JSON.stringify({
            start: today(getLocalTimeZone()),
            end: userDateSelection.end,
          }),
        },
        pathname,
        params,
        router,
      });
      setUserDateSelection((prev) => ({
        ...prev,
        start: today(getLocalTimeZone()),
      }));
    }

    if (type === "checkOut") {
      AssignNewQueryParams({
        updatedParams: {
          [SEARCH_PARAM_KEYS.SEARCH_DATE]: JSON.stringify({
            start: userDateSelection.start,
            end: today(getLocalTimeZone()).add({ weeks: 1 }),
          }),
        },
        pathname,
        params,
        router,
      });

      setUserDateSelection((prev) => ({
        ...prev,
        end: today(getLocalTimeZone()).add({ weeks: 1 }),
      }));
    }

    if (type === "all") {
      AssignNewQueryParams({
        updatedParams: {
          [SEARCH_PARAM_KEYS.SEARCH_DATE]: null,
        },
        pathname,
        params,
        router,
      });

      setUserDateSelection({
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({ weeks: 1 }),
      });
    }
  };

  useEffect(() => {
    if (window && window.innerWidth < 1080) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  useEffect(() => {
    const storedDateSelection = params.get(SEARCH_PARAM_KEYS.SEARCH_DATE);

    if (storedDateSelection) {
      setIsNewDateSelected(true);
      setUserDateSelection({
        start: ParseLocalStorageDates(storedDateSelection!).start,
        end: ParseLocalStorageDates(storedDateSelection!).end,
      });
    }
  }, [params]);

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
    <div
      className={styles.search_bar_input_dates}
      data-state={staysButtonState}
    >
      {isToggleModal && (
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
            onChange={(value: RangeValue<DateValue>) => {
              handleBookingCalendarSelections(value);
            }}
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
            <div className={styles.input_wrap}>
              <input
                type="text"
                id="dateInput"
                className={styles.search_bar_input}
                placeholder="Select date"
                value={
                  isDefaultDate
                    ? ""
                    : DateFormatingMonthDay(userDateSelection.start)
                }
                readOnly
              />
              <ClearInputSelectionButton
                show={
                  !!isToggleModal &&
                  isDateExperiencesSelectionCheckIn &&
                  !isCategoryChanged
                }
                callback={(e) => handleClearDateSelection(e, "checkIn")}
                disabled={isDefaultDate}
              />
            </div>

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
            <div className={styles.input_wrap}>
              <input
                type="text"
                id="dateInput"
                className={styles.search_bar_input}
                placeholder="Select date"
                value={
                  isDefaultDate
                    ? ""
                    : DateFormatingMonthDay(userDateSelection.end)
                }
                readOnly
              />
              <ClearInputSelectionButton
                show={
                  !!isToggleModal &&
                  isDateExperiencesSelectionCheckOut &&
                  !isCategoryChanged
                }
                callback={(e) => handleClearDateSelection(e, "checkOut")}
                disabled={isDefaultDate}
              />
            </div>
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
          <div className={styles.input_wrap}>
            <input
              type="text"
              id="dateInput"
              className={styles.search_bar_input}
              placeholder="Select date"
              value={
                !isDefaultDate
                  ? userDateSelection.start || userDateSelection.end
                    ? `${DateFormatingMonthDay(userDateSelection.start)} ${
                        userDateSelection.start &&
                        userDateSelection.end &&
                        " - "
                      } ${DateFormatingMonthDay(userDateSelection.end)}`
                    : ""
                  : ""
              }
              readOnly
            />
            <ClearInputSelectionButton
              show={!!isToggleModal && !isDefaultDate}
              callback={(e) => handleClearDateSelection(e, "all")}
              disabled={isDefaultDate}
            />
          </div>

          <label htmlFor="dateInput" className={styles.search_bar_label}>
            Date
          </label>
        </div>
      )}
    </div>
  );
};

export const DatesSelectionComponent = memo(DatesSelection);
