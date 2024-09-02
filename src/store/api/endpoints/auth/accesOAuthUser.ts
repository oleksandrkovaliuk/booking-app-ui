import { api } from "../../api";
import { apiUrls } from "../../lib/constants";
import { FullUserTypes } from "@/_utilities/interfaces";

const accesOAuthUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    AccesOAuthUser: builder.mutation({
      query: ({
        email,
        user_name,
        user_lastname,
        img_url,
        provider,
      }: FullUserTypes) => ({
        url: apiUrls.auth_oauth_user,
        method: "POST",

        body: {
          email,
          user_name,
          user_lastname,
          img_url,
          provider,
        },
      }),

      invalidatesTags: ["USER"],
    }),
  }),
  overrideExisting: false,
});

export const { AccesOAuthUser } = accesOAuthUserApi.endpoints;
export const { useAccesOAuthUserMutation } = accesOAuthUserApi;
