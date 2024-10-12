import React, { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { getLocalTimeZone, today } from "@internationalized/date";
import { DateValue, RangeCalendar, RangeValue } from "@nextui-org/calendar";

import { useSelector } from "@/store";
import { searchSelectionSelector } from "@/store/selectors/searchSelection";
import { setSearchSelection } from "@/store/slices/search/searchSelectionSlice";

import {
  CountNights,
  DateFormatingMonthDay,
  isDateValueEqual,
  ParseLocalStorageDates,
} from "@/helpers/dateManagment";

import { searchParamsKeys } from "@/layout/header/_lib/enums";
import { CalendarSelectionProps } from "../../_lib/type";

import styles from "./calendarSection.module.scss";

export const CalendarSection: React.FC<CalendarSelectionProps> = ({
  title,
  disabledDates,
}) => {
  const dispatch = useDispatch();

  const { parsedSearchDate } = useSelector(searchSelectionSelector);

  const [triggeredSelection, setTriggeredSelection] = useState<
    "checkIn" | "checkOut" | "both"
  >("checkIn");

  // CONDITIONS
  const isDefaultDate =
    isDateValueEqual(parsedSearchDate) && triggeredSelection !== "both";

  const checkInOrOutText =
    triggeredSelection === "checkIn"
      ? "Select check-in date"
      : "Select check-out date";

  const textContentBasedOnSelection = isDefaultDate
    ? checkInOrOutText
    : `${CountNights(
        parsedSearchDate.start,
        parsedSearchDate.end
      )} nights in ${title}`;

  const handleSetDateSelection = (value: RangeValue<DateValue>) => {
    if (value.start.toString() !== value.end.toString()) {
      dispatch(
        setSearchSelection({
          [searchParamsKeys.SEARCH_DATE]: JSON.stringify(value),
        })
      );

      setTriggeredSelection("both");
    } else {
      toast(
        <div className="toast ">
          🫣 Selected dates cannot be the same. The minimum stay is one night.
        </div>
      );

      dispatch(
        setSearchSelection({
          [searchParamsKeys.SEARCH_DATE]: JSON.stringify({
            start: today(getLocalTimeZone()),
            end: today(getLocalTimeZone()).add({ weeks: 1 }),
          }),
        })
      );
    }
  };

  return (
    <section className={styles.select_date}>
      <span className={styles.section_title}>
        {textContentBasedOnSelection}
      </span>
      <div className={styles.section_subtitle}>
        {isDefaultDate
          ? "Minimum stay of 1 night"
          : `${DateFormatingMonthDay(
              parsedSearchDate.start
            )} - ${DateFormatingMonthDay(parsedSearchDate.end)}`}
      </div>
      <div className={styles.calendar_container}>
        <RangeCalendar
          aria-label="Booking dates"
          visibleMonths={3}
          onChange={(value: RangeValue<DateValue>) =>
            handleSetDateSelection(value)
          }
          onFocusChange={() => {
            setTriggeredSelection("checkOut");
          }}
          color="primary"
          minValue={today(getLocalTimeZone())}
          defaultValue={parsedSearchDate}
          isDateUnavailable={(date: DateValue) => {
            if (!date) return false;
            return disabledDates?.some(
              (disabledDate) =>
                disabledDate.day === date.day &&
                disabledDate.month === date.month &&
                disabledDate.year === date.year
            );
          }}
        />
      </div>
    </section>
  );
};
