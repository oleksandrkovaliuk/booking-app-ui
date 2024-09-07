import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrls } from "../../lib/constants";

const requestDeleteUserListingImagesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    requestDeleteUserListingImages: builder.mutation<
      void,
      {
        user_email: string;
        location: string;
      }
    >({
      query: ({
        user_email,
        location,
      }: {
        user_email: string;
        location: string;
      }) => ({
        url: ApiUrls.requestDeleteUserListingImages,
        method: "POST",
        body: {
          user_email,
          location,
        },
      }),
      invalidatesTags: [ApiTags.CURRENT_LISTING],
    }),
  }),
});

export const { requestDeleteUserListingImages } =
  requestDeleteUserListingImagesApi.endpoints;
export const { useRequestDeleteUserListingImagesMutation } =
  requestDeleteUserListingImagesApi;
