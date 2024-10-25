import { DateValue } from "@nextui-org/calendar";

export interface IListingPageComponentProps {
  id: string;
  isPublic?: boolean;
}

export interface ICalendarSelectionProps {
  title: string;
  disabledDates: DateValue[];
}
export interface IReserveListingBlockProps {
  price: string;
  disabled: boolean;
  isPublic: boolean;
  guests_limit: number;
  disabledDates: DateValue[];
}
