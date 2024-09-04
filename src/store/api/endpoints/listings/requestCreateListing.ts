import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrls } from "../../lib/constants";
import { ListingState } from "../../lib/type";

const requestCreateListingApi = api.injectEndpoints({
  endpoints: (build) => ({
    requestCreateListing: build.mutation<void, ListingState>({
      query: ({
        host_name,
        host_email,
        category,
        type,
        cordinates,
        address,
        guests,
        accesable,
        pets_allowed,
        images,
        title,
        aboutplace,
        placeis,
        notes,
        price,
      }) => ({
        url: ApiUrls.requestCreateListing,
        method: "POST",
        body: {
          host_name,
          host_email,
          category,
          type,
          cordinates,
          address,
          guests,
          accesable,
          pets_allowed,
          images,
          title,
          aboutplace,
          placeis,
          notes,
          price,
        },
      }),
      invalidatesTags: [
        ApiTags.USER_LISTINGS,
        ApiTags.VERIFIED_LISTINGS,
        ApiTags.LISTING,
      ],
    }),
  }),
});

export const { requestCreateListing } = requestCreateListingApi.endpoints;
export const { useRequestCreateListingMutation } = requestCreateListingApi;
