import { globalCalendarState } from "@/store/slices/userDateSelectionSlice/type";
import { DateValue } from "@nextui-org/calendar";

export interface ReserveListingBlockProps {
  price: string;
  guests_limit: number;
  disabledDates: DateValue[];
}

export interface DateInputConrainerProps {
  disabledDates: DateValue[];
  userDateSelection: globalCalendarState;
  inputSelection: "checkIn" | "checkOut" | "both" | "guests" | "none";
  setInputSelection: React.Dispatch<
    React.SetStateAction<"checkIn" | "checkOut" | "both" | "guests" | "none">
  >;
}
