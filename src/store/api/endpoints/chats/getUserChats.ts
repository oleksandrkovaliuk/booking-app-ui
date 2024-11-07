import { api } from "../../api";

import { ApiTags } from "../../lib/enums";
import { ApiUrlsChats } from "../../lib/constants";
import { IUsersChats } from "../../lib/interfaces";

const getUsersChatsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsersChats: builder.query<IUsersChats[], void>({
      query: () => ({
        url: ApiUrlsChats.getUsersChats,
      }),
      providesTags: [ApiTags.USER_CHATS],
    }),
  }),
});

export const { useGetUsersChatsQuery } = getUsersChatsApi;
export const { getUsersChats } = getUsersChatsApi.endpoints;
