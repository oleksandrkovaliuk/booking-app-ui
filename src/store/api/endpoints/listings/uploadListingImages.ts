import { api } from "../../api";
import { apiUrls } from "../../lib/constants";

const uploadListingImagesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadListingImages: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: apiUrls.uploadListingImages,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["CURRENT_LISTING"],
    }),
  }),
  overrideExisting: true,
});

export const { useUploadListingImagesMutation } = uploadListingImagesApi;
export const { uploadListingImages } = uploadListingImagesApi.endpoints;
