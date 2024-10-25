import { api } from "../../api";

import { ApiTags } from "../../lib/enums";
import { ApiUrlsUser } from "../../lib/constants";
import { IUserNotifications } from "../../lib/interfaces";

const getUserNotificationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserNotifications: builder.query<IUserNotifications[], void>({
      query: () => ({
        url: ApiUrlsUser.getUserNotifications,
      }),
      providesTags: [ApiTags.USER_NOTIFICATIONS],
    }),
  }),
});

export const { useGetUserNotificationsQuery } = getUserNotificationsApi;
export const { getUserNotifications } = getUserNotificationsApi.endpoints;
