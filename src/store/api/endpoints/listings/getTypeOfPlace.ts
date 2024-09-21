import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrlsListings } from "../../lib/constants";
import { TypeOfPlace } from "../../lib/type";

const getListingsTypeOfPlaceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getListingsTypeOfPlace: builder.query<TypeOfPlace[], void>({
      query: () => ({
        url: ApiUrlsListings.getListingsTypeOfPlace,
      }),
      providesTags: [ApiTags.LISTING_TYPE_OF_PLACE],
    }),
  }),
  overrideExisting: true,
});

export const { useGetListingsTypeOfPlaceQuery } = getListingsTypeOfPlaceApi;
export const { getListingsTypeOfPlace } = getListingsTypeOfPlaceApi.endpoints;
