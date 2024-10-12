import { DateValue, RangeValue } from "@nextui-org/calendar";
import {
  CalendarDate,
  isEqualDay,
  isEqualMonth,
  isEqualYear,
  today,
  getLocalTimeZone,
} from "@internationalized/date";

export interface DateFormatingProps {
  year: number;
  month: number;
  day: number;
}

export const DateFormatingMonthDay = ({
  year,
  month,
  day,
}: DateFormatingProps): string => {
  const date = new Date(year, month - 1, day);
  const monthName = date.toLocaleString("en-us", { month: "short" });
  const dayOfMonth = date.getDate();
  const formattedDateString = `${monthName} ${dayOfMonth}`;

  return formattedDateString;
};

export const CountNights = (start: DateValue, end: DateValue): number => {
  if (!start || !end) return 0;

  const diffInMs =
    new Date(end.year, end.month - 1, end.day).getTime() -
    new Date(start.year, start.month - 1, start.day).getTime();

  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return Math.round(diffInDays);
};

export const ParseLocalStorageDates = (storedDates: string) => {
  const { start, end } = JSON.parse(storedDates);
  const newUserDateSelection: RangeValue<DateValue> = {
    start: new CalendarDate(start.year, start.month, start.day),
    end: new CalendarDate(end.year, end.month, end.day),
  };
  return newUserDateSelection;
};

export const isDateValueEqual = (dateSelection: RangeValue<DateValue>) => {
  return (
    isEqualDay(dateSelection.start, today(getLocalTimeZone())) &&
    isEqualMonth(dateSelection.start, today(getLocalTimeZone())) &&
    isEqualYear(dateSelection.start, today(getLocalTimeZone())) &&
    isEqualDay(
      dateSelection.end,
      today(getLocalTimeZone()).add({ weeks: 1 })
    ) &&
    isEqualMonth(
      dateSelection.end,
      today(getLocalTimeZone()).add({ weeks: 1 })
    ) &&
    isEqualYear(dateSelection.end, today(getLocalTimeZone()).add({ weeks: 1 }))
  );
};

export const ConverIntoDateValueFormat = (incomingDate: Date): DateValue => {
  const date = new Date(incomingDate);
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
};

export const GetEveryDateFromRange = (start: Date, end: Date) => {
  const result = [];

  while (start <= end) {
    result.push(ConverIntoDateValueFormat(new Date(start)));
    start.setDate(start.getDate() + 1);
  }

  return result;
};
