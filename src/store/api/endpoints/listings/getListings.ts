import { ListingState } from "@/app/api/apiCalls";
import { api } from "../../api";
import { apiUrls } from "../../lib/constants";

const getListingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getListings: builder.query<ListingState[], void>({
      query: () => ({
        url: apiUrls.getListings,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetListingsQuery } = getListingsApi;
export const { getListings } = getListingsApi.endpoints;
