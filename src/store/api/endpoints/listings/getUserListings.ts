import { ListingState } from "@/app/api/apiCalls";
import { api } from "../../api";
import { apiUrls } from "../../lib/constants";

const getUserListingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserListings: builder.query<
      ListingState[],
      {
        user_name: string;
        user_email: string;
      }
    >({
      query: ({
        user_name,
        user_email,
      }: {
        user_name: string;
        user_email: string;
      }) => ({
        url: `${apiUrls.getUserListings}/${user_name}/${user_email}`,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetUserListingsQuery } = getUserListingsApi;
export const { getUserListings } = getUserListingsApi.endpoints;
