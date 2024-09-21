import { Procantages } from "@/_utilities/enums";

export const CalculatePriceIncludingTax = (price: number) => {
  const calculateTaxes = Math.round(price * Procantages.TAXES);
  const cleaningFee = Math.round(price * Procantages.CLEANING_FEE);
  const serviceFee = Math.round(price * Procantages.SPACER_FEE);

  return {
    with_taxes: calculateTaxes,
    with_cleaning_fee: cleaningFee,
    with_service_fee: serviceFee,
    total_price: calculateTaxes + cleaningFee + serviceFee + price,
  };
};
