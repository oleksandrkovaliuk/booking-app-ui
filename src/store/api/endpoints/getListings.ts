import { api } from "../reducer";
import { apiUrls } from "../constants";

const getListingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getListings: builder.query({
      query: () => ({
        url: apiUrls.listings,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetListingsQuery } = getListingsApi;
export const { getListings } = getListingsApi.endpoints;
