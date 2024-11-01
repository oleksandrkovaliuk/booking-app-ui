import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrlsListings } from "../../lib/constants";

import { IListingState } from "../../lib/interfaces";

const getCurrentListingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentListing: builder.query<IListingState, { id: number }>({
      query: ({ id }: { id: number }) => ({
        url: `${ApiUrlsListings.getCurrentListing}/${id}`,
      }),
      providesTags: [ApiTags.CURRENT_LISTING],
    }),
  }),

  overrideExisting: true,
});

export const { getCurrentListing } = getCurrentListingApi.endpoints;
export const { useGetCurrentListingQuery } = getCurrentListingApi;
