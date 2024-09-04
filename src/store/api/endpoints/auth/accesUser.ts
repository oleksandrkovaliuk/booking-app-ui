import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrls } from "../../lib/constants";

import { UserTypes } from "@/_utilities/interfaces";

const accesUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    AccesUser: builder.mutation({
      query: ({ email, password }: UserTypes) => ({
        url: ApiUrls.auth_acces_user,
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: [ApiTags.USER],
    }),
  }),
  overrideExisting: false,
});

export const { AccesUser } = accesUserApi.endpoints;
export const { useAccesUserMutation } = accesUserApi;
