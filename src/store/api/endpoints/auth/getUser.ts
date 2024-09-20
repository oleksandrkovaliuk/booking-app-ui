import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrlsAuth } from "../../lib/constants";

const GetUser = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: ({
        user_name,
        user_email,
      }: {
        user_name: string;
        user_email: string;
      }) => ({
        url: `${ApiUrlsAuth.getUser}/${user_email}/${user_name}`,
      }),
      providesTags: [ApiTags.CURRENT_USER],
    }),
  }),
  overrideExisting: false,
});

export const { getUser } = GetUser.endpoints;
export const { useGetUserQuery } = GetUser;
