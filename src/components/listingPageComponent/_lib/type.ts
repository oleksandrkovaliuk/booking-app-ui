import { DateValue, RangeValue } from "@nextui-org/calendar";
import { Dispatch, SetStateAction } from "react";

export interface ListingPageComponentProps {
  id: string;
  isPublic?: boolean;
}

export interface CalendarSelectionProps {
  title: string;
  disabledDates: DateValue[];
  userDateSelection: RangeValue<DateValue>;
  setUserDateSelection: Dispatch<SetStateAction<RangeValue<DateValue>>>;
}
export interface ReserveListingBlockProps {
  price: string;
  isPublic: boolean;
  guests_limit: number;
  disabledDates: DateValue[];
  userDateSelection: RangeValue<DateValue>;
  setUserDateSelection: Dispatch<SetStateAction<RangeValue<DateValue>>>;
}

export interface DateInputConrainerProps {
  disabledDates: DateValue[];
  userDateSelection: RangeValue<DateValue>;
  inputSelection: "checkIn" | "checkOut" | "guests" | "none";

  setInputSelection: React.Dispatch<
    React.SetStateAction<"checkIn" | "checkOut" | "guests" | "none">
  >;
  setUserDateSelection: Dispatch<SetStateAction<RangeValue<DateValue>>>;
}