import { ListingState } from "@/app/api/apiCalls";
import { api } from "../../api";
import { apiUrls } from "../../lib/constants";

const getCurrentListingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentListing: builder.query<ListingState, { id: number }>({
      query: ({ id }: { id: number }) => ({
        url: `${apiUrls.getCurrentListing}/${id}`,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { getCurrentListing } = getCurrentListingApi.endpoints;
export const { useGetCurrentListingQuery } = getCurrentListingApi;
