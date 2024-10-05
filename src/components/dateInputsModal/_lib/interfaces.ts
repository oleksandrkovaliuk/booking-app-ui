import { DateValue } from "@nextui-org/calendar";

export interface DateInputsModalProps {
  isSeparateModal?: boolean;
  disabledDates: DateValue[];

  inputSelection: "checkIn" | "checkOut" | "guests" | "none";

  setInputSelection: React.Dispatch<
    React.SetStateAction<"checkIn" | "checkOut" | "guests" | "none">
  >;
}
