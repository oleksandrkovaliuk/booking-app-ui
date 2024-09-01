import React from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { getLocalTimeZone, today } from "@internationalized/date";
import { DateValue, RangeCalendar, RangeValue } from "@nextui-org/calendar";

import {
  setCheckIn,
  setCheckOut,
  setResetDate,
} from "@/store/slices/userDateSelectionSlice";

import { CountNights, DateFormatingMonthDay } from "@/sharing/dateManagment";

import styles from "./calendarSection.module.scss";
import { useSelector } from "@/store";

export const CalendarSection: React.FC<{
  title: string;
  disabledDates: DateValue[];
}> = ({ title, disabledDates }) => {
  const dispatch = useDispatch();
  const userDateSelection = useSelector((state) => state.userDateSelection);

  const [triggeredSelection, setTriggeredSelection] = React.useState<
    "checkIn" | "checkOut" | "both"
  >("checkIn");

  // CONDITIONS
  const checkInOrOutText =
    triggeredSelection === "checkIn"
      ? "Select check-in date"
      : "Select check-out date";

  const textContentBasedOnSelection =
    triggeredSelection !== "both"
      ? checkInOrOutText
      : `${CountNights(
          userDateSelection.start,
          userDateSelection.end
        )} nights in ${title}`;

  const handleSetDateSelection = (value: RangeValue<DateValue>) => {
    console.log(
      value.start === value.end,
      value.start.toString() === value.end.toString(),
      value.start,
      value.end,
      "log"
    );
    if (value.start.toString() !== value.end.toString()) {
      dispatch(setCheckIn(value.start));
      dispatch(setCheckOut(value.end));
      setTriggeredSelection("both");
    } else {
      toast(
        <div className="toast ">
          🫣 Selected dates cannot be the same. The minimum stay is one night.
        </div>
      );
      dispatch(setResetDate());
    }
  };
  return (
    <section className={styles.select_date}>
      <span className={styles.section_title}>
        {textContentBasedOnSelection}
      </span>
      <div className={styles.section_subtitle}>
        {triggeredSelection !== "both"
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
