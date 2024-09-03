import { api } from "../../api";
import { apiUrls } from "../../lib/constants";
import { ListingState } from "../../lib/type";

const getVerifiedListingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVerifiedListings: builder.query<ListingState[], void>({
      query: () => ({
        url: apiUrls.getVerifiedListings,
      }),
      providesTags: ["VERIFIED_LISTINGS"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetVerifiedListingsQuery } = getVerifiedListingsApi;
export const { getVerifiedListings } = getVerifiedListingsApi.endpoints;
