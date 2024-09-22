import { DateValue, RangeValue } from "@nextui-org/calendar";

import { api } from "../../api";

import { ApiTags } from "../../lib/enums";
import { ApiUrlsListings } from "../../lib/constants";
import { ListingState, TypeOfPlace } from "../../lib/type";
import { searchParamsKeys } from "@/layout/header/_lib/enums";

const getVerifiedListingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVerifiedListingByParams: builder.query<
      ListingState[],
      {
        options: {
          [key: string]: string | null | boolean;
        };
      }
    >({
      query: ({ options }) => ({
        url: `${
          ApiUrlsListings.getVerifiedListingByParams
        }?options=${JSON.stringify(options)}`,
      }),
      providesTags: [ApiTags.VERIFIED_LISTINGS_BY_PARAMS],
    }),

    requestListingSearch: builder.mutation<
      ListingState[],
      {
        [searchParamsKeys.SEARCH_PLACE]: {
          [key: string]: string;
        } | null;
        [searchParamsKeys.SEARCH_DATE]: RangeValue<DateValue> | null;
        [searchParamsKeys.SEARCH_AMOUNT_OF_GUESTS]: number | null;
        [searchParamsKeys.SEARCH_INCLUDE_PETS]: boolean | null;
        [searchParamsKeys.SEARCH_CATEGORY_ID]?: number | null;

        accesable?: boolean | null;
        shared_room?: boolean | null;
        price_range?: number[] | null;
        returnFiltered?: boolean | null;
        type_of_place?: TypeOfPlace | null;
        options: {
          [key: string]: string | null;
        };
      }
    >({
      query: ({
        search_place,
        search_date,
        search_amountOfGuests,
        search_includePets,
        search_category_id,

        accesable,
        shared_room,
        price_range,
        type_of_place,
        returnFiltered,
        options,
      }) => ({
        url: ApiUrlsListings.requestListingSearch,
        method: "POST",
        body: {
          search_place,
          search_date,
          search_amountOfGuests,
          search_includePets,
          search_category_id,

          accesable,
          price_range,
          shared_room,
          type_of_place,
          returnFiltered,
        },
      }),
      async onQueryStarted({ options }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedListings } = await queryFulfilled;

          console.log("updatedListings", updatedListings);
          dispatch(
            api.util.updateQueryData(
              "getVerifiedListingByParams" as never,
              { options } as never,
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

export const {
  useRequestListingSearchMutation,
  useGetVerifiedListingByParamsQuery,
} = getVerifiedListingsApi;
export const { requestListingSearch, getVerifiedListingByParams } =
  getVerifiedListingsApi.endpoints;
