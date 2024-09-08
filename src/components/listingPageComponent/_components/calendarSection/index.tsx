import React, { useState } from "react";
import { toast } from "sonner";
import { getLocalTimeZone, today } from "@internationalized/date";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DateValue, RangeCalendar, RangeValue } from "@nextui-org/calendar";

import {
  CountNights,
  DateFormatingMonthDay,
  isDateValueEqual,
} from "@/helpers/dateManagment";
import { updateAndStoreQueryParams } from "@/helpers/paramsManagment";

import { SEARCH_PARAM_KEYS } from "@/layout/header/_lib/enums";
import { CalendarSelectionProps } from "../../_lib/type";

import styles from "./calendarSection.module.scss";

export const CalendarSection: React.FC<CalendarSelectionProps> = ({
  title,
  disabledDates,
  userDateSelection,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [triggeredSelection, setTriggeredSelection] = useState<
    "checkIn" | "checkOut" | "both"
  >("checkIn");

  // CONDITIONS
  const isDefaultDate =
    isDateValueEqual(userDateSelection) && triggeredSelection !== "both";

  const checkInOrOutText =
    triggeredSelection === "checkIn"
      ? "Select check-in date"
      : "Select check-out date";

  const textContentBasedOnSelection = isDefaultDate
    ? checkInOrOutText
    : `${CountNights(
        userDateSelection.start,
        userDateSelection.end
      )} nights in ${title}`;

  const handleSetDateSelection = (value: RangeValue<DateValue>) => {
    if (value.start.toString() !== value.end.toString()) {
      updateAndStoreQueryParams({
        updatedParams: {
          [SEARCH_PARAM_KEYS.SEARCH_DATE]: JSON.stringify(value),
        },
        pathname,
        params,
        router,
      });

      localStorage.setItem(
        SEARCH_PARAM_KEYS.SEARCH_DATE,
        JSON.stringify({
          start: value.start,
          end: value.end,
        })
      );
      setTriggeredSelection("both");
    } else {
      toast(
        <div className="toast ">
          🫣 Selected dates cannot be the same. The minimum stay is one night.
        </div>
      );
      localStorage.removeItem("userDateSelection");
      updateAndStoreQueryParams({
        updatedParams: {
          [SEARCH_PARAM_KEYS.SEARCH_DATE]: JSON.stringify({
            start: today(getLocalTimeZone()),
            end: today(getLocalTimeZone()).add({ weeks: 1 }),
          }),
        },
        pathname,
        params,
        router,
      });
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
              userDateSelection.start
            )} - ${DateFormatingMonthDay(userDateSelection.end)}`}
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
          value={userDateSelection}
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
