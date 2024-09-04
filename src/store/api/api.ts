import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../helpers/constants";
import { ApiTagsTypes } from "./lib/constants";

// import { HYDRATE } from "next-redux-wrapper";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  keepUnusedDataFor: 5,
  tagTypes: ApiTagsTypes,
  endpoints: () => ({}),
});
