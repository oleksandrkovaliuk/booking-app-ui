import { api } from "../../api";
import { apiUrls } from "../../lib/constants";
import { UserTypes } from "@/_utilities/interfaces";

const accesUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    AccesUser: builder.mutation({
      query: ({ email, password }: UserTypes) => ({
        url: apiUrls.auth_acces_user,
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: ["USER"],
    }),
  }),
  overrideExisting: false,
});

export const { AccesUser } = accesUserApi.endpoints;
export const { useAccesUserMutation } = accesUserApi;
