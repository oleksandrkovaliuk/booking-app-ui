import { api } from "../../api";
import { ApiUrlsUser } from "../../lib/constants";

const updateUserReservationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateUserReservation: builder.mutation<
      {
        message: string;
        chatId: number;
      },
      {
        message: string;
        chatId: number;
      },
      {
        listing_id: number;
        host_email: string;
        guest_message: string;
        payment_intent: string;
        reservation_dates: string;
      }
    >({
      query: ({
        listing_id,
        host_email,
        guest_message,
        payment_intent,
        reservation_dates,
      }) => ({
        url: ApiUrlsUser.updateUserReservations,
        method: "POST",
        body: {
          listing_id,
          host_email,
          guest_message,
          payment_intent,
          reservation_dates,
        },
      }),
    }),
  }),
});

export const { updateUserReservation } = updateUserReservationsApi.endpoints;
export const { useUpdateUserReservationMutation } = updateUserReservationsApi;
