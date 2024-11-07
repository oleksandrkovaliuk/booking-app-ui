import { DateValue } from "@nextui-org/calendar";
import { IShowCaseUser } from "@/_utilities/interfaces";
import { IListingState } from "@/store/api/lib/interfaces";

export interface IReservePageProps {
  listingHost: IShowCaseUser;
  params: { location: string; id: string };
  listing: IListingState;
}

export interface IYourTripBlockProps {
  disabledDates: DateValue[];
}
