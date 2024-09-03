import { api } from "../../api";
import { apiUrls } from "../../lib/constants";
import { ListingState } from "../../lib/type";

const requestCreateListingApi = api.injectEndpoints({
  endpoints: (build) => ({
    requestCreateListing: build.mutation<ListingState, ListingState>({
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
        url: apiUrls.requestToCreateListing,
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
      invalidatesTags: ["USER_LISTINGS", "VERIFIED_LISTINGS", "LISTINGS"],
    }),
  }),
});

export const { requestCreateListing } = requestCreateListingApi.endpoints;
export const { useRequestCreateListingMutation } = requestCreateListingApi;
