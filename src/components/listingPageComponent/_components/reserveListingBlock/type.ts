import { DateValue } from "@nextui-org/calendar";
import { Dispatch, SetStateAction } from "react";

export interface ReserveListingBlockProps {
  price: string;
  guests_limit: number;
  disabledDates: DateValue[];
}

export interface DateInputConrainerProps {
  disabledDates: DateValue[];
  inputSelection: "checkIn" | "checkOut" | "guests" | "none";
  setInputSelection: React.Dispatch<
    React.SetStateAction<"checkIn" | "checkOut" | "guests" | "none">
  >;
  setModalState: Dispatch<SetStateAction<boolean>>;
}
