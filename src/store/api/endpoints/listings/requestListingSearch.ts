import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrls } from "../../lib/constants";
import { DateValue, RangeValue } from "@nextui-org/calendar";
import { SEARCH_PARAM_KEYS } from "@/layout/header/_lib/enums";
import { ListingState } from "../../lib/type";

const requestListingSearchApi = api.injectEndpoints({
  endpoints: (builder) => ({
    requestListingSearch: builder.mutation({
      query: ({
        search_place,
        search_date,
        search_amountOfGuests,
        search_includePets,
        search_category,
      }: {
        [SEARCH_PARAM_KEYS.SEARCH_PLACE]: {
          [key: string]: string;
        } | null;
        [SEARCH_PARAM_KEYS.SEARCH_DATE]: RangeValue<DateValue> | null;
        [SEARCH_PARAM_KEYS.SEARCH_AMOUNT_OF_GUESTS]: number | null;
        [SEARCH_PARAM_KEYS.SEARCH_INCLUDE_PETS]: boolean | null;
        [SEARCH_PARAM_KEYS.SEARCH_CATEGORY]: string | null;
      }) => ({
        url: ApiUrls.requestListingSearch,
        method: "POST",
        body: {
          search_place,
          search_date,
          search_amountOfGuests,
          search_includePets,
          search_category,
        },
      }),
    }),
  }),
});

export const { requestListingSearch } = requestListingSearchApi.endpoints;
export const { useRequestListingSearchMutation } = requestListingSearchApi;
