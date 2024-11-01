import { api } from "../../api";

import { ApiTags } from "../../lib/enums";
import { IChatData } from "../../lib/interfaces";
import { ApiUrlsChats } from "../../lib/constants";

const getCurrentChatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentChat: builder.query<IChatData, { chatId: string }>({
      query: ({ chatId }) => ({
        url: `${ApiUrlsChats.getCurrentChat}?chatId=${chatId}`,
      }),
      providesTags: [ApiTags.CURRENT_CHAT],
    }),
  }),
});

export const { useGetCurrentChatQuery } = getCurrentChatApi;
export const { getCurrentChat } = getCurrentChatApi.endpoints;
