import { DateValue } from "@nextui-org/calendar";

import { api } from "../../api";
import { ApiUrlsListings } from "../../lib/constants";

const requestSetRangeOfDisabledDatesApi = api.injectEndpoints({
  endpoints: (build) => ({
    requestSetRangeOfDisabledDates: build.mutation<
      void,
      { disabledDates: DateValue[]; id: number }
    >({
      query: ({ disabledDates, id }) => ({
        url: ApiUrlsListings.requestSetRangeOfDisabledDates,
        method: "POST",
        body: { disabledDates, id },
      }),
    }),
  }),
});

export const { requestSetRangeOfDisabledDates } =
  requestSetRangeOfDisabledDatesApi.endpoints;
export const { useRequestSetRangeOfDisabledDatesMutation } =
  requestSetRangeOfDisabledDatesApi;
