import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrlsUser } from "../../lib/constants";
import { IUserSearchRegionHistory } from "../../lib/interfaces";

const userSearchRegionHistoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserSearchRegionHistory: builder.query<IUserSearchRegionHistory[], void>(
      {
        query: () => ({
          url: ApiUrlsUser.getUserSearchRegionHistory,
        }),
        providesTags: [ApiTags.USER_SEARCH_REGION_HISTORY],
      }
    ),
    updateUserSearchRegionHistory: builder.mutation<
      IUserSearchRegionHistory[],
      IUserSearchRegionHistory
    >({
      query: ({ id, requestedAt, region, formattedValue }) => ({
        url: ApiUrlsUser.updateUserSearchRegionHistory,
        method: "POST",
        body: { id, requestedAt, region, formattedValue },
      }),
      invalidatesTags: [ApiTags.USER_SEARCH_REGION_HISTORY],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserSearchRegionHistoryQuery,
  useUpdateUserSearchRegionHistoryMutation,
} = userSearchRegionHistoryApi;
export const { updateUserSearchRegionHistory, getUserSearchRegionHistory } =
  userSearchRegionHistoryApi.endpoints;
