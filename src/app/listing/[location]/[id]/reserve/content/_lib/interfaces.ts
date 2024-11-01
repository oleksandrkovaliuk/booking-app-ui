import { DateValue } from "@nextui-org/calendar";

export interface IReservePageProps {
  params: { location: string; id: string };
}

export interface IYourTripBlockProps {
  disabledDates: DateValue[];
}
