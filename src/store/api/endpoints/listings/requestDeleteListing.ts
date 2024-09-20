import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrlsListings } from "../../lib/constants";

const requestDeleteListingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    requestDeleteListing: builder.mutation<{ id: number }, { id: number }>({
      query: ({ id }: { id: number }) => ({
        url: ApiUrlsListings.requestDeleteListing,
        method: "POST",
        body: { id },
      }),
      invalidatesTags: [ApiTags.USER_LISTINGS],
    }),
  }),
  overrideExisting: true,
});

export const { requestDeleteListing } = requestDeleteListingApi.endpoints;
export const { useRequestDeleteListingMutation } = requestDeleteListingApi;
