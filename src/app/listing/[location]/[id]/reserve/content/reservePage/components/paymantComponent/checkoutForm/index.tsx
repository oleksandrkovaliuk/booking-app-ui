import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useSession } from "next-auth/react";
import { Button, Skeleton, Spinner } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { usePathname, useSearchParams } from "next/navigation";

import { store, useSelector } from "@/store";
import { searchSelectionSelector } from "@/store/selectors/searchSelection";
import { getClientSecret } from "@/store/api/endpoints/payment/getClientSecret";

import { APP_ROOT_URL } from "@/helpers/constants";
import { GetEveryDateFromRange } from "@/helpers/dateManagment";

import { CheckoutFormProps } from "../_lib/interfaces";

import styles from "./checkoutForm.module.scss";

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  total,
  listing_id,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const pathname = usePathname();
  const params = useSearchParams();

  const { data: session } = useSession();

  const { search_date } = useSelector(searchSelectionSelector);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const todayDate = search_date
    ? JSON.parse(search_date).start
    : today(getLocalTimeZone());

  const endDate = search_date
    ? JSON.parse(search_date).end
    : today(getLocalTimeZone()).add({ weeks: 1 });

  const formattedSelectedDateStart = new Date(
    todayDate.year,
    todayDate.month - 1,
    todayDate.day
  );

  const formattedSelectedDateEnd = new Date(
    endDate.year,
    endDate.month - 1,
    endDate.day
  );

  const disabledDates = GetEveryDateFromRange(
    formattedSelectedDateStart,
    formattedSelectedDateEnd
  );

  const handleSubmitPayment = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (
        !stripe ||
        !elements ||
        !clientSecret ||
        !formattedSelectedDateStart ||
        !listing_id
      ) {
        throw new Error("Failed with initializing required dependencies");
      }

      const { error: validationError } = await elements.submit();

      if (validationError) {
        throw new Error(validationError.message);
      }

      setIsLoading(true);
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${APP_ROOT_URL}/success/payment?disabled_dates=${JSON.stringify(
            disabledDates
          )}&listing_id=${listing_id}&host_email=${
            session?.user?.email
          }&message=${params?.get("message")}`,
        },
      });

      if (error) {
        throw new Error(
          "Something went wrong to procces your request. Please try again"
        );
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error((error as Error).message, {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    }
  };
  const requestClientSecret = useCallback(async () => {
    try {
      const { data: res, error } = await store.dispatch(
        getClientSecret.initiate({ total })
      );
      if (error && !res)
        throw new Error("Something went wrong. With creating intent payment.");
      setClientSecret(res!);
    } catch (error) {
      toast.error((error as Error).message, {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    }
  }, [total]);

  useEffect(() => {
    if (!session?.user?.email) return;
    requestClientSecret();
  }, [session, requestClientSecret]);

  return (
    <>
      {clientSecret ? (
        <form
          onSubmit={handleSubmitPayment}
          className={styles.checkout_container}
        >
          <PaymentElement className={styles.payment_element} />

          <button disabled={!stripe} className={styles.submit_checkout_button}>
            {isLoading ? <Spinner size="sm" color="white" /> : "Reserve"}
          </button>
        </form>
      ) : (
        <div className={styles.paymet_skeleton}>
          <Skeleton className={styles.main_skeleton} />
          <div className={styles.date_cvv_container}>
            <Skeleton className={styles.date_cvv_skeleton} />
            <Skeleton className={styles.date_cvv_skeleton} />
          </div>
          <Skeleton className={styles.main_skeleton} />
        </div>
      )}
      {!clientSecret && !session?.user.email && (
        <div className={styles.login_to_procces}>
          <span className={styles.title}>
            In order to procces the reservation , please authorize your account.
          </span>
          <Link href={`/login?callbackUrl=${pathname}?${params.toString()}`}>
            <Button size="lg" className={styles.login_button}>
              Authorize
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};
