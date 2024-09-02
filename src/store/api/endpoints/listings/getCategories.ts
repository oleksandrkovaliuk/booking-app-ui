import { api } from "../../api";
import { apiUrls } from "../../lib/constants";
import { Category } from "@/store/slices/listingsInfoSlice/type";

const getListingsCategoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getListingsCategories: builder.query<Category[], void>({
      query: () => ({
        url: apiUrls.getListingsCategories,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetListingsCategoriesQuery } = getListingsCategoriesApi;
export const { getListingsCategories } = getListingsCategoriesApi.endpoints;
