import { api } from "../../api";

import { ApiUrlsAuth } from "../../lib/constants";

const updateTokensBlackListApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateTokensBlackList: build.query<void, void>({
      query: () => ({
        url: ApiUrlsAuth.update_tokens_blacklist,
      }),
    }),
  }),
});

export const { useUpdateTokensBlackListQuery } = updateTokensBlackListApi;
export const { updateTokensBlackList } = updateTokensBlackListApi.endpoints;
