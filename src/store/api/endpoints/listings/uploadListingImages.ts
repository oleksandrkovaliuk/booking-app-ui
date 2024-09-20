import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrlsListings } from "../../lib/constants";

const uploadListingImagesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadListingImages: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: ApiUrlsListings.uploadListingImages,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [ApiTags.CURRENT_LISTING],
    }),
  }),
  overrideExisting: true,
});

export const { useUploadListingImagesMutation } = uploadListingImagesApi;
export const { uploadListingImages } = uploadListingImagesApi.endpoints;
