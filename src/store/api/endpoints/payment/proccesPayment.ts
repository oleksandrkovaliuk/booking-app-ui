import { api } from "../../api";
import { ApiUrlsPayment } from "../../lib/constants";

const proccesPaymentApi = api.injectEndpoints({
  endpoints: (build) => ({
    proccesPayment: build.mutation<
      { message?: string; sender: string },
      { chatId: string }
    >({
      query: ({ chatId }) => ({
        url: ApiUrlsPayment.proccesPayment,
        method: "POST",
        body: { chatId },
      }),
    }),
  }),
});

export const { useProccesPaymentMutation } = proccesPaymentApi;
export const { proccesPayment } = proccesPaymentApi.endpoints;
