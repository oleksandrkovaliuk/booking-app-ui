import { api } from "../../api";
import { apiUrls } from "../../lib/constants";

const requestToDeleteListingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    requestToDeleteListing: builder.mutation<{ id: number }, { id: number }>({
      query: ({ id }: { id: number }) => ({
        url: apiUrls.requestToDeleteListing,
        method: "POST",
        body: { id },
      }),
    }),
  }),
  overrideExisting: true,
});

export const { requestToDeleteListing } = requestToDeleteListingApi.endpoints;
export const { useRequestToDeleteListingMutation } = requestToDeleteListingApi;
