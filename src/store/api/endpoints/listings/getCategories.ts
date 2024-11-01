import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrlsListings } from "../../lib/constants";

import { ICategory, IListingState } from "../../lib/interfaces";

const getListingsCategoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFullCategoriesList: builder.query<ICategory[], void>({
      query: () => ({
        url: ApiUrlsListings.getFullListOfListingCategories,
      }),
      providesTags: [ApiTags.FULL_CATEGORIES_LIST],
    }),
    getListingsCategories: builder.query<
      ICategory[],
      {
        options: {
          [key: string]: string | null | boolean;
        };
      }
    >({
      query: ({ options }) => ({
        url: `${ApiUrlsListings.getListingsCategories}?options=${JSON.stringify(
          options
        )}`,
      }),
      providesTags: [ApiTags.LISTING_CATEGORIES],
    }),
  }),
  overrideExisting: true,
});

export const { useGetListingsCategoriesQuery, useGetFullCategoriesListQuery } =
  getListingsCategoriesApi;
export const {
  getListingsCategories,

  getFullCategoriesList,
} = getListingsCategoriesApi.endpoints;
