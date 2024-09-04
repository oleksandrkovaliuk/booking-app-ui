import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrls } from "../../lib/constants";
import { ListingState } from "../../lib/type";

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
        url: `${ApiUrls.getUserListings}/${user_name}/${user_email}`,
      }),
      providesTags: [ApiTags.USER_LISTINGS],
    }),
  }),
  overrideExisting: true,
});

export const { useGetUserListingsQuery } = getUserListingsApi;
export const { getUserListings } = getUserListingsApi.endpoints;
