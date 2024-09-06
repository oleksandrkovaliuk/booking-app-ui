import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrls } from "../../lib/constants";

const requestDeleteIndividualListingImageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    requestDeleteIndividualListingImage: builder.mutation<
      { url: string }[],
      {
        user_email: string;
        location: string;
        image: string;
      }
    >({
      query: ({
        user_email,
        location,
        image,
      }: {
        user_email: string;
        location: string;
        image: string;
      }) => ({
        url: ApiUrls.requestDeleteIndividualListingImage,
        method: "POST",
        body: {
          user_email,
          location,
          image,
        },
      }),
      invalidatesTags: [ApiTags.CURRENT_LISTING],
    }),
  }),
});

export const { requestDeleteIndividualListingImage } =
  requestDeleteIndividualListingImageApi.endpoints;
export const { useRequestDeleteIndividualListingImageMutation } =
  requestDeleteIndividualListingImageApi;
