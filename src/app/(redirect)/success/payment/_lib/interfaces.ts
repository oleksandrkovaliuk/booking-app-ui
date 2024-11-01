export interface IReservationDetailsForHost {
  guest_email: string;
  host_email: string;
  listing_id: number;
  payment_intent: string;
  payment_intent_client_secret: string;
}

export interface IReservationStatus {
  loading: boolean | null;
  success: boolean | null;
  error: boolean | null;
  status: string;
  message: string;
  beenProcessedAt: Date | null;
}
