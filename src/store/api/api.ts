import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../helpers/constants";
import { ApiTagsTypes } from "./lib/constants";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  tagTypes: ApiTagsTypes,
  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (action.type === HYDRATE) {
  //     return action.payload[reducerPath];
  //   }
  // },
  endpoints: () => ({}),
});
