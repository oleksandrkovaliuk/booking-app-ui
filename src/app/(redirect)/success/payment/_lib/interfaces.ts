export interface ReservationDetailsForHost {
  guest_email: string;
  host_email: string;
  listing_id: number;
  payment_intent: string;
  payment_intent_client_secret: string;
}
