import { api } from "../../api";
import { apiUrls } from "../../lib/constants";

const CheckAuthType = api.injectEndpoints({
  endpoints: (builder) => ({
    checkAuthType: builder.mutation({
      query: ({ email }: { email: string }) => ({
        url: apiUrls.check_auth_type,
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["USER"],
    }),
  }),
  overrideExisting: false,
});

export const { checkAuthType } = CheckAuthType.endpoints;
export const { useCheckAuthTypeMutation } = CheckAuthType;
