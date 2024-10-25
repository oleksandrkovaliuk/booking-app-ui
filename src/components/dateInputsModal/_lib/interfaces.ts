import { Dispatch, SetStateAction } from "react";
import { DateValue } from "@nextui-org/calendar";

export interface IDateInputsModalProps {
  isSeparateModal?: boolean;
  disabledDates: DateValue[];

  inputSelection: "checkIn" | "checkOut" | "guests" | "none";

  setInputSelection: Dispatch<
    SetStateAction<"checkIn" | "checkOut" | "guests" | "none">
  >;
}

export interface IModalComponentProps extends IDateInputsModalProps {
  children?: React.ReactNode;

  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IDateInputsPickerProps
  extends Omit<IModalComponentProps, "disabledDates"> {
  isModalOpen: boolean;
}
