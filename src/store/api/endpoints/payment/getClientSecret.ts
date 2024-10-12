import { api } from "../../api";
import { ApiUrlsPayment } from "../../lib/constants";

const getClientSecretApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getClientSecret: builder.query<string, { total: number }>({
      query: ({ total }) => ({
        url: `${ApiUrlsPayment.getClientSecret}?total=${JSON.stringify(total)}`,
      }),
    }),
  }),
});

export const { getClientSecret } = getClientSecretApi.endpoints;
export const { useGetClientSecretQuery } = getClientSecretApi;
