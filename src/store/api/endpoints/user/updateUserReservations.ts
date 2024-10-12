import { api } from "../../api";
import { ApiUrlsUser } from "../../lib/constants";

const updateUserReservationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateUserReservation: builder.mutation<
      void,
      {
        listing_id: number;
        host_email: string;
        guest_email: string;
        guest_message: string;
        payment_intent: string;
        payment_intent_client_secret: string;
      }
    >({
      query: ({
        listing_id,
        host_email,
        guest_email,
        guest_message,
        payment_intent,
        payment_intent_client_secret,
      }) => ({
        url: ApiUrlsUser.updateUserReservations,
        method: "POST",
        body: {
          listing_id,
          host_email,
          guest_email,
          guest_message,
          payment_intent,
          payment_intent_client_secret,
        },
      }),
    }),
  }),
});

export const { updateUserReservation } = updateUserReservationsApi.endpoints;
export const { useUpdateUserReservationMutation } = updateUserReservationsApi;
