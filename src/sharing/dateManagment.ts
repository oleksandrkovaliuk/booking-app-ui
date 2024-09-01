import { DateValue } from "@nextui-org/calendar";

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

export const ConverIntoDateValueFormat = (
  incomingDate: Date
): DateFormatingProps => {
  const date = new Date(incomingDate);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
};
