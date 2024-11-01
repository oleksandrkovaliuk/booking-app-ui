import { api } from "../../api";
import { ApiUrlsChats } from "../../lib/constants";
import { ApiTags } from "../../lib/enums";

const newChatMessageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    newChatMessage: builder.mutation<
      { message: string },
      {
        to: string;
        from: string;
        chatId: string;
        message: string;
      }
    >({
      query: ({ to, from, chatId, message }) => ({
        url: ApiUrlsChats.newChatMessage,
        method: "POST",
        body: { to, from, chatId, message },
      }),
    }),
  }),
});

export const { useNewChatMessageMutation } = newChatMessageApi;
export const { newChatMessage } = newChatMessageApi.endpoints;
