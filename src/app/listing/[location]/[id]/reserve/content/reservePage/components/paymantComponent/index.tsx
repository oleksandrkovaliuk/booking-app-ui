import React, { useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./checkoutForm";

import { IPaymantComponentProps } from "./_lib/interfaces";

import styles from "./paymantComponent.module.scss";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);

export const PaymantComponent: React.FC<IPaymantComponentProps> = ({
  total,
  listing_id,
  host_email,
}) => {
  return (
    <div className={styles.paymant_section}>
      {!Number.isNaN(total) && (
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: total,
            currency: "usd",
            capture_method: "manual",
            appearance: {
              labels: "floating",
              variables: {
                fontFamily:
                  "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap",

                colorPrimary: "#ff395c",
                colorText: "#2f2f2f",
                borderRadius: "10px",
              },
            },
          }}
        >
          <CheckoutForm
            total={total}
            listing_id={listing_id}
            host_email={host_email}
          />
        </Elements>
      )}
    </div>
  );
};
