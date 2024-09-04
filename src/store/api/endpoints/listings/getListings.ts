import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrls } from "../../lib/constants";
import { ListingState } from "../../lib/type";

const getListingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getListings: builder.query<ListingState[], void>({
      query: () => ({
        url: ApiUrls.getListings,
      }),
      providesTags: [ApiTags.LISTING],
    }),
  }),
  overrideExisting: true,
});

export const { useGetListingsQuery } = getListingsApi;
export const { getListings } = getListingsApi.endpoints;
