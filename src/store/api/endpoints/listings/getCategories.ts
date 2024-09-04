import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrls } from "../../lib/constants";

import { Category } from "../../lib/type";

const getListingsCategoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getListingsCategories: builder.query<Category[], void>({
      query: () => ({
        url: ApiUrls.getListingsCategories,
      }),
      providesTags: [ApiTags.LISTING_CATEGORIES],
    }),
  }),
  overrideExisting: true,
});

export const { useGetListingsCategoriesQuery } = getListingsCategoriesApi;
export const { getListingsCategories } = getListingsCategoriesApi.endpoints;
