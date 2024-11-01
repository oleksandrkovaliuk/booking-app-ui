import { api } from "../../api";
import { ApiTags } from "../../lib/enums";
import { ApiUrlsListings } from "../../lib/constants";
import { IFormState } from "@/app/manage/_components/type";

const requestUpdateListingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    requestUpdateListing: builder.mutation<
      void,
      {
        column: string;
        data: IFormState[keyof IFormState];
        id: number;
      }
    >({
      query: ({
        column,
        data,
        id,
      }: {
        column: string;
        data: IFormState[keyof IFormState];
        id: number;
      }) => ({
        url: ApiUrlsListings.requestUpdateListing,
        method: "POST",
        body: {
          column,
          data,
          id,
        },
      }),
      invalidatesTags: [ApiTags.CURRENT_LISTING],
    }),
  }),
  overrideExisting: true,
});

export const { requestUpdateListing } = requestUpdateListingApi.endpoints;
export const { useRequestUpdateListingMutation } = requestUpdateListingApi;
