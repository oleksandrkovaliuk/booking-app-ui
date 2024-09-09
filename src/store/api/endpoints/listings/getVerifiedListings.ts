import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrls } from "../../lib/constants";
import { ListingState } from "../../lib/type";
import { SEARCH_PARAM_KEYS } from "@/layout/header/_lib/enums";
import { DateValue, RangeValue } from "@nextui-org/calendar";

const getVerifiedListingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVerifiedListings: builder.query<ListingState[], void>({
      query: () => ({
        url: ApiUrls.getVerifiedListings,
      }),
      providesTags: [ApiTags.VERIFIED_LISTINGS],
    }),

    requestListingSearch: builder.mutation<
      ListingState[],
      {
        [SEARCH_PARAM_KEYS.SEARCH_PLACE]: {
          [key: string]: string;
        } | null;
        [SEARCH_PARAM_KEYS.SEARCH_DATE]: RangeValue<DateValue> | null;
        [SEARCH_PARAM_KEYS.SEARCH_AMOUNT_OF_GUESTS]: number | null;
        [SEARCH_PARAM_KEYS.SEARCH_INCLUDE_PETS]: boolean | null;
        [SEARCH_PARAM_KEYS.SEARCH_CATEGORY_ID]?: number | null;
      }
    >({
      query: ({
        search_place,
        search_date,
        search_amountOfGuests,
        search_includePets,
        search_category_id,
      }: {
        [SEARCH_PARAM_KEYS.SEARCH_PLACE]: {
          [key: string]: string;
        } | null;
        [SEARCH_PARAM_KEYS.SEARCH_DATE]: RangeValue<DateValue> | null;
        [SEARCH_PARAM_KEYS.SEARCH_AMOUNT_OF_GUESTS]: number | null;
        [SEARCH_PARAM_KEYS.SEARCH_INCLUDE_PETS]: boolean | null;
        [SEARCH_PARAM_KEYS.SEARCH_CATEGORY_ID]?: number | null;
      }) => ({
        url: ApiUrls.requestListingSearch,
        method: "POST",
        body: {
          search_place,
          search_date,
          search_amountOfGuests,
          search_includePets,
          search_category_id,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedListings } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData(
              "getVerifiedListings" as never,
              undefined as never,
              () => updatedListings
            )
          );
        } catch {
          return;
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetVerifiedListingsQuery, useRequestListingSearchMutation } =
  getVerifiedListingsApi;
export const { getVerifiedListings, requestListingSearch } =
  getVerifiedListingsApi.endpoints;
