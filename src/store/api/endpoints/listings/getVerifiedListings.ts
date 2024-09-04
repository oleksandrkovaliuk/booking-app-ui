import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrls } from "../../lib/constants";
import { ListingState } from "../../lib/type";

const getVerifiedListingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVerifiedListings: builder.query<ListingState[], void>({
      query: () => ({
        url: ApiUrls.getVerifiedListings,
      }),
      providesTags: [ApiTags.VERIFIED_LISTINGS],
    }),
  }),
  overrideExisting: true,
});

export const { useGetVerifiedListingsQuery } = getVerifiedListingsApi;
export const { getVerifiedListings } = getVerifiedListingsApi.endpoints;
