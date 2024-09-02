import { TypeOfPlace } from "@/store/slices/listingsInfoSlice/type";
import { api } from "../../api";
import { apiUrls } from "../../lib/constants";

const getListingsTypeOfPlaceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getListingsTypeOfPlace: builder.query<TypeOfPlace[], void>({
      query: () => ({
        url: apiUrls.getListingsTypeOfPlace,
      }),
      providesTags: ["LISTING_TYPE_OF_PLACE"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetListingsTypeOfPlaceQuery } = getListingsTypeOfPlaceApi;
export const { getListingsTypeOfPlace } = getListingsTypeOfPlaceApi.endpoints;
