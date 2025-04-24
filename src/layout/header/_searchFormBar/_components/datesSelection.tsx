import React, { memo, useEffect, useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useSearchParams } from "next/navigation";
import { DateValue, RangeCalendar, RangeValue } from "@nextui-org/calendar";

import { useSelector } from "@/store";
import { setFetch } from "@/store/slices/listings/isSearchTriggeredSlice";
import { isWidthHandlerSelector } from "@/store/selectors/isWidthHandler";
import { setSearchSelection } from "@/store/slices/search/searchSelectionSlice";

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

import { ClearInputSelectionButton } from "./clearInputSelection";

import { ISelectionComponentsProps } from "./type";
import { searchParamsKeys } from "../../_lib/enums";
import { TypesOfSelections } from "@/_utilities/enums";

import styles from "../search_form_bar.module.scss";

const DatesSelection: React.FC<ISelectionComponentsProps> = ({
  searchBarRef,
  handlePopUpMenuOpening,
}) => {
  const dispatch = useDispatch();
  const params = useSearchParams();

  const { setTriggeredSelection } = useTriggeredSelectionApi();
  const { triggeredSelection } = useTriggeredSelectionData();

  const { staysButtonState, isCategoryChanged } = useStaysButtonContextData();
  const { setIsCategoryChanged } = useStaysButtonContextApi();

  const { tablet } = useSelector(isWidthHandlerSelector);

  const [userDateSelection, setUserDateSelection] = useState<
    RangeValue<DateValue>
  >({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  });

  const [isNewDateSelected, setIsNewDateSelected] = useState<boolean>(false);

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
      dispatch(setFetch(false));
    }
  };

  const handleBookingCalendarSelections = (value: RangeValue<DateValue>) => {
    if (isDateSelection) {
      setUserDateSelection({
        ...userDateSelection,
        start: value.start,
      });
    } else if (value.start.toString() !== value.end.toString()) {
      dispatch(
        setSearchSelection({
          [searchParamsKeys.SEARCH_DATE]: JSON.stringify(value),
        })
      );

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
    dispatch(setFetch(false));

    return null;
  };

  const handleClearDateSelection = (
    e: React.MouseEvent,
    type: "checkIn" | "checkOut" | "all"
  ) => {
    e.preventDefault();

    if (type === "checkIn") {
      dispatch(
        setSearchSelection({
          [searchParamsKeys.SEARCH_DATE]: JSON.stringify({
            start: today(getLocalTimeZone()),
            end: userDateSelection.end,
          }),
        })
      );
      setUserDateSelection((prev) => ({
        ...prev,
        start: today(getLocalTimeZone()),
      }));
    }

    if (type === "checkOut") {
      dispatch(
        setSearchSelection({
          [searchParamsKeys.SEARCH_DATE]: JSON.stringify({
            start: userDateSelection.start,
            end: today(getLocalTimeZone()).add({ weeks: 1 }),
          }),
        })
      );
      setUserDateSelection((prev) => ({
        ...prev,
        end: today(getLocalTimeZone()).add({ weeks: 1 }),
      }));
    }

    if (type === "all") {
      dispatch(
        setSearchSelection({
          [searchParamsKeys.SEARCH_DATE]: null,
        })
      );
      setUserDateSelection({
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({ weeks: 1 }),
      });
    }
    dispatch(setFetch(false));
  };

  useEffect(() => {
    const storedDateSelection = params.get(searchParamsKeys.SEARCH_DATE);

    if (storedDateSelection) {
      setIsNewDateSelected(true);
      setUserDateSelection({
        start: ParseLocalStorageDates(storedDateSelection!).start,
        end: ParseLocalStorageDates(storedDateSelection!).end,
      });
      dispatch(
        setSearchSelection({
          [searchParamsKeys.SEARCH_DATE]: storedDateSelection,
        })
      );
    }
  }, [dispatch, params]);

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
            visibleMonths={tablet ? 1 : 2}
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
      {staysButtonState && !tablet ? (
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
                placeholder="Оберіть дату"
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
              Чек-ін
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
                placeholder="Оберіть дату"
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
              Чек-аут
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
              placeholder="Оберіть дати"
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
            Дати
          </label>
        </div>
      )}
    </div>
  );
};

export const DatesSelectionComponent = memo(DatesSelection);
