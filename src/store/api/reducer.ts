import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../sharing/constants";
import { getServerSession } from "next-auth";
// import { HYDRATE } from "next-redux-wrapper";
// import { RootState } from "..";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      // const state = getState() as RootState;
      // const token = state.auth.token;

      const session = getServerSession().then((res) => console.log(res, 'res'));

      // console.log(session, " session");

      // if (session) {
      //   headers.set("Authorization", session);
      // }

      return headers;
    },
  }),
  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (action.type === HYDRATE) {
  //     return action.payload[reducerPath];
  //   }
  // },
  endpoints: () => ({}),
});
