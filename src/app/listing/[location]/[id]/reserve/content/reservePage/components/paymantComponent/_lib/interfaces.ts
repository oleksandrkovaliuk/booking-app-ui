export interface IPaymantComponentProps {
  total: number;
  host_email: string;
  listing_id: number;
}

export interface ICheckoutFormProps extends IPaymantComponentProps {}
