import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrls } from "../../lib/constants";

import { ListingState } from "../../lib/type";

const getCurrentListingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentListing: builder.query<ListingState, { id: number }>({
      query: ({ id }: { id: number }) => ({
        url: `${ApiUrls.getCurrentListing}/${id}`,
      }),
      providesTags: [ApiTags.CURRENT_LISTING],
    }),
  }),

  overrideExisting: true,
});

export const { getCurrentListing } = getCurrentListingApi.endpoints;
export const { useGetCurrentListingQuery } = getCurrentListingApi;
