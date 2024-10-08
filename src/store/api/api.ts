import { getSession } from "next-auth/react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_API_URL } from "../../helpers/constants";
import { ApiTagsTypes } from "./lib/constants";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: async (headers, { getState }) => {
      const session = await getSession().then((res) => res);
      if (session) {
        headers.set("Authorization", `Bearer ${session.user.jwt} `);
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 5,
  tagTypes: ApiTagsTypes,
  endpoints: () => ({}),
});
