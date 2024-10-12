import { Dispatch, SetStateAction } from "react";
import { DateValue } from "@nextui-org/calendar";

export interface DateInputsModalProps {
  isSeparateModal?: boolean;
  disabledDates: DateValue[];

  inputSelection: "checkIn" | "checkOut" | "guests" | "none";

  setInputSelection: Dispatch<
    SetStateAction<"checkIn" | "checkOut" | "guests" | "none">
  >;
}

export interface ModalComponentProps extends DateInputsModalProps {
  children?: React.ReactNode;

  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DateInputsPickerProps
  extends Omit<ModalComponentProps, "disabledDates"> {
  isModalOpen: boolean;
}
