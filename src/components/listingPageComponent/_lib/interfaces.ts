import { DateValue } from "@nextui-org/calendar";
import { IShowCaseUser } from "@/_utilities/interfaces";
import { IListingState } from "@/store/api/lib/interfaces";

export interface IListingPageComponentProps {
  listing: IListingState;
  listingHost: IShowCaseUser;
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
