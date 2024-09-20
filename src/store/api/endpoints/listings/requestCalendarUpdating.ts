import { DateValue } from "@nextui-org/calendar";

import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrlsListings } from "../../lib/constants";

const requestCalendarUpdatingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    requestCalendarUpdating: builder.mutation<
      { message: string; status: number },
      { disabledDates: DateValue[]; id: number }
    >({
      query: ({
        disabledDates,
        id,
      }: {
        disabledDates: DateValue[];
        id: number;
      }) => ({
        url: ApiUrlsListings.requestUpdateCalendar,
        method: "POST",
        body: { disabledDates, id },
      }),
      invalidatesTags: [ApiTags.CURRENT_LISTING],
    }),
  }),
  overrideExisting: true,
});

export const { requestCalendarUpdating } = requestCalendarUpdatingApi.endpoints;
export const { useRequestCalendarUpdatingMutation } =
  requestCalendarUpdatingApi;
