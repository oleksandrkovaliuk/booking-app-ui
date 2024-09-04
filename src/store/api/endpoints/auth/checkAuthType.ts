import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrls } from "../../lib/constants";

const CheckAuthType = api.injectEndpoints({
  endpoints: (builder) => ({
    checkAuthType: builder.mutation({
      query: ({ email }: { email: string }) => ({
        url: ApiUrls.check_auth_type,
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
