import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrlsAuth } from "../../lib/constants";

const CheckAuthType = api.injectEndpoints({
  endpoints: (builder) => ({
    checkAuthType: builder.mutation({
      query: ({ email }: { email: string }) => ({
        url: ApiUrlsAuth.check_auth_type,
        method: "POST",
        body: { email },
      }),
      invalidatesTags: [ApiTags.USER],
    }),
  }),
  overrideExisting: false,
});

export const { checkAuthType } = CheckAuthType.endpoints;
export const { useCheckAuthTypeMutation } = CheckAuthType;
