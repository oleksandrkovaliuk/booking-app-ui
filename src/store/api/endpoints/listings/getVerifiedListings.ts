import { api } from "../../api";

import { ApiTags } from "../../lib/enums";
import { IListingState } from "../../lib/interfaces";
import { ApiUrlsListings } from "../../lib/constants";

const getVerifiedListingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVerifiedListingByParams: builder.query<
      IListingState[],
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
