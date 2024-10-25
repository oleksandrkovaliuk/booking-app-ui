import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrlsListings } from "../../lib/constants";
import { IListingState } from "../../lib/interfaces";

const getUserListingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserListings: builder.query<IListingState[], void>({
      query: () => ({
        url: ApiUrlsListings.getUserListings,
      }),
      providesTags: [ApiTags.USER_LISTINGS],
    }),
  }),
  overrideExisting: true,
});

export const { useGetUserListingsQuery } = getUserListingsApi;
export const { getUserListings } = getUserListingsApi.endpoints;
