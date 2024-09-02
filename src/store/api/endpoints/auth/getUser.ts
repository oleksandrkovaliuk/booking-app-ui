import { api } from "../../api";
import { apiUrls } from "../../lib/constants";

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
        url: `${apiUrls.getUser}/${user_email}/${user_name}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { getUser } = GetUser.endpoints;
export const { useGetUserQuery } = GetUser;
