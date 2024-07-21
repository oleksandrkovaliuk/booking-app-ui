export interface DateFormatingProps {
  year: number;
  month: number;
  day: number;
}
export function DateFormatingMonthDay({
  year,
  month,
  day,
}: DateFormatingProps): string {
  const date = new Date(year, month - 1, day);
  const monthName = date.toLocaleString("en-us", { month: "short" });
  const dayOfMonth = date.getDate();
  const formattedDateString = `${monthName} ${dayOfMonth}`;

  return formattedDateString;
}
