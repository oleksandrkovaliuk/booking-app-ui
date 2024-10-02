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
  }),
  overrideExisting: true,
});

export const { useGetVerifiedListingByParamsQuery } = getVerifiedListingsApi;
export const { getVerifiedListingByParams } = getVerifiedListingsApi.endpoints;
