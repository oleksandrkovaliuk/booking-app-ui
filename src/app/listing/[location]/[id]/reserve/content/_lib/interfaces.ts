import { DateValue } from "@nextui-org/calendar";

export interface ReservePageProps {
  params: { location: string; id: string };
}

export interface YourTripBlockProps {
  disabledDates: DateValue[];
}
