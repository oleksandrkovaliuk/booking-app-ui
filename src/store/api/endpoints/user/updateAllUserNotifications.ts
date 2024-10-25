import { api } from "../../api";

import { ApiTags } from "../../lib/enums";
import { ApiUrlsUser } from "../../lib/constants";
import { IUserNotifications } from "../../lib/interfaces";

const updateAllUserNotificationsApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateAllUserNotifications: build.mutation<IUserNotifications[], void>({
      query: () => ({
        url: ApiUrlsUser.updateAllUserNotifications,
        method: "PATCH",
      }),
      invalidatesTags: [ApiTags.USER_NOTIFICATIONS],
    }),
  }),
});

export const { useUpdateAllUserNotificationsMutation } =
  updateAllUserNotificationsApi;
export const { updateAllUserNotifications } =
  updateAllUserNotificationsApi.endpoints;
