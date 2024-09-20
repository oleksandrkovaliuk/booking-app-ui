import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrlsListings } from "../../lib/constants";

import { Category, ListingState } from "../../lib/type";

const getListingsCategoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getListingsCategories: builder.query<Category[], void>({
      query: () => ({
        url: ApiUrlsListings.getListingsCategories,
      }),
      providesTags: [ApiTags.LISTING_CATEGORIES],
    }),
    requestAvailableCategories: builder.mutation<Category[], ListingState[]>({
      query: (listings) => ({
        url: ApiUrlsListings.requestAvailableCategories,
        method: "POST",
        body: { listings },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: updateCategories } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData(
              "getListingsCategories" as never,
              undefined as never,
              () => updateCategories
            )
          );
        } catch {
          return;
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetListingsCategoriesQuery,
  useRequestAvailableCategoriesMutation,
} = getListingsCategoriesApi;
export const { getListingsCategories, requestAvailableCategories } =
  getListingsCategoriesApi.endpoints;
