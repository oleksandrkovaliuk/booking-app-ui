import { ListingState } from "@/app/api/apiCalls";
import { api } from "../../api";
import { apiUrls } from "../../lib/constants";

const getVerifiedListingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVerifiedListings: builder.query<ListingState[], void>({
      query: () => ({
        url: apiUrls.getVerifiedListings,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetVerifiedListingsQuery } = getVerifiedListingsApi;
export const { getVerifiedListings } = getVerifiedListingsApi.endpoints;
