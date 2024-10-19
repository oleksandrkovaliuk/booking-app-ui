"use client";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { store } from "@/store";
import { updateUserReservation } from "@/store/api/endpoints/user/updateUserReservations";
import { requestSetRangeOfDisabledDates } from "@/store/api/endpoints/listings/requestSetRangeOfDisabledDates";

import sittingB from "@/assets/sittingB.webp";
import super_host_black from "@/assets/medal-of-honor-black.png";

import { CreateNewQueryParams } from "@/helpers/paramsManagment";

import styles from "./paymentContent.module.scss";
import Image from "next/image";
import { StatusBadge } from "@/components/statusBadge";
import { Skeleton, Spinner, Tooltip } from "@nextui-org/react";
import { useGetCurrentListingQuery } from "@/store/api/endpoints/listings/getCurrentListing";
import { getUser } from "@/store/api/endpoints/auth/getUser";
import { ShowCaseUser } from "@/_utilities/interfaces";

export const PaymentContent: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const { data: session } = useSession();
  const { data: listing, isLoading } = useGetCurrentListingQuery({
    id: Number(params.get("listing_id")),
  });

  const [host, setHost] = useState<ShowCaseUser>({
    user_name: "",
    email: "",
    img_url: "",
    role: "",
  });
  const [reservationStatus, setReservationStatus] = useState<{
    loading: boolean | null;
    success: boolean | null;
    error: boolean | null;
    status: string | null;
    message: string | null;
    beenProcessedAt: Date | null;
  }>({
    loading: true,
    success: null,
    error: null,
    status: "Proccesing",
    beenProcessedAt: null,
    message: "Proccesing your request",
  });
  //   CONSTANTS

  const colorBasedOnStatus: { secondary: string; primary: string } =
    reservationStatus.status === "Proccesing"
      ? { secondary: "rgba(255, 165, 0, 0.3)", primary: "#ffa500" }
      : reservationStatus.status === "Almost done"
      ? { secondary: "rgba(173, 216, 230, 0.3)", primary: "#add8e6" }
      : reservationStatus.status === "Complete"
      ? { secondary: "rgba(34, 139, 34, 0.3)", primary: "#228b22" }
      : {
          secondary: "rgba(255, 69, 58, 0.3)",
          primary: "#ff453a",
        };

  const handleReturnUserToReservePage = () => {
    router.back();
  };
  const handleSetDisabledDates = useCallback(async () => {
    try {
      const incomingParams = Object.fromEntries(params.entries());

      if (
        !incomingParams.disabled_dates &&
        incomingParams.redirect_status === "succeeded"
      ) {
        return setReservationStatus((prev) => ({
          ...prev,
          success: true,
          loading: false,
          status: "Complete",
          beenProcessedAt: new Date(),
          message: "Your Reservation created and sent successfully",
        }));
      }

      if (
        !incomingParams ||
        !incomingParams.disabled_dates ||
        !incomingParams.listing_id
      ) {
        throw new Error("We could not procces your request. Please try again");
      }

      if (
        !JSON.parse(incomingParams.disabled_dates).length ||
        Number.isNaN(JSON.parse(incomingParams.listing_id))
      ) {
        throw new Error("We could not procces your request. Please try again");
      }

      setReservationStatus((prev) => ({
        ...prev,
        loading: true,
      }));

      const { data: res, error: disabledDatesUpdateError } =
        await store.dispatch(
          requestSetRangeOfDisabledDates.initiate({
            disabledDates: JSON.parse(incomingParams.disabled_dates),
            id: JSON.parse(incomingParams.listing_id),
          })
        );

      if (disabledDatesUpdateError && !res) {
        throw new Error(
          "Failed to update disabled dates and procces your request. Please try again"
        );
      }

      const { data: reservationUpdateRes, error: reservationUpdateError } =
        await store.dispatch(
          updateUserReservation.initiate({
            guest_email: session?.user.email!,
            guest_message: incomingParams.message,
            host_email: incomingParams.host_email,
            listing_id: Number(incomingParams.listing_id),
            payment_intent: incomingParams.payment_intent,
            payment_intent_client_secret:
              incomingParams.payment_intent_client_secret,
          })
        );

      if (reservationUpdateError && !reservationUpdateRes) {
        throw new Error(
          "Failed to procces your request. Possibly the reason is that reservation assigned to this account or this specific listing already exist. Please contact host or customer support if you have any questions."
        );
      }

      setReservationStatus((prev) => ({
        ...prev,
        status: "Almost done",
        message: "Final touches left",
      }));
      const clearedParams = CreateNewQueryParams({
        updatedParams: {
          disabled_dates: null,
        },
        params,
      });

      router.replace(`${pathname}?${clearedParams}`, {
        scroll: false,
      });

      setReservationStatus((prev) => ({
        ...prev,
        success: true,
        loading: false,
        status: "Complete",
        beenProcessedAt: new Date(),
        message: "Your Reservation created and sent successfully",
      }));
    } catch (error) {
      return setReservationStatus((prev) => ({
        ...prev,
        error: true,
        loading: false,
        status: "Failed",
        message: (error as Error).message,
      }));
    }
  }, [params, pathname, router, session?.user.email]);

  useEffect(() => {
    handleSetDisabledDates();
  }, [handleSetDisabledDates]);

  useEffect(() => {
    const setUpPage = async () => {
      const user = await store
        .dispatch(
          getUser.initiate({
            user_email: listing?.host_email!,
          })
        )
        .unwrap();

      setHost((prev) => {
        if (!user.data) return prev;

        return {
          user_name: user.data.user_name
            ? user.data.user_name.split(" ")[0]
            : user.data.user_email,
          email: user.data.user_email,
          img_url: user.data.img_url,
          role: user.data.role,
        };
      });
    };

    if (!listing?.host_email && !listing?.host_name) return;
    setUpPage();
  }, [listing?.host_email, listing?.host_name]);

  return (
    <div className={styles.payment_succes_container}>
      <div className={styles.proccesing_block_wrap}>
        <div className={styles.proccesing_block}>
          <Image
            src={sittingB}
            alt="sittingB"
            width={50}
            height={50}
            className={styles.sittingB}
          />
          <div className={styles.status_and_message}>
            <div
              className={styles.status}
              style={{
                backgroundColor: colorBasedOnStatus.secondary,
                borderColor: colorBasedOnStatus.primary,
              }}
              data-loading-status={reservationStatus.loading}
            >
              <span
                className={styles.circle}
                style={{ backgroundColor: colorBasedOnStatus.primary }}
              />
              <div
                className={styles.status_text}
                style={{ color: colorBasedOnStatus.primary }}
              >
                {reservationStatus.status}
              </div>
            </div>
            <div className={styles.message}>
              {reservationStatus.message}
              {reservationStatus.loading && (
                <>
                  <span className={styles.dote}>.</span>
                  <span className={styles.dote}>.</span>
                  <span className={styles.dote}>.</span>
                </>
              )}
            </div>
          </div>

          <div className={styles.reservation_details}>
            <h1 className={styles.title}>Reservation details</h1>
            {isLoading ? (
              <Skeleton className={styles.reservation_listing_info_skeleton} />
            ) : (
              <div className={styles.reservation_listing_info}>
                <div className={styles.reservation_listing_title_info}>
                  <Image
                    alt="listing image"
                    src={listing?.images[0].url!}
                    width={100}
                    height={100}
                    className={styles.listing_image}
                  />
                  <div className={styles.listing_info}>
                    <h2 className={styles.sub_title}>{listing?.title}</h2>
                    <p className={styles.sub_description}>
                      {listing?.type?.type_name}
                    </p>
                    <div className={styles.listing_accomplishments}>
                      {host.role === "superhost" && (
                        <div className={styles.super_host}>
                          <Tooltip
                            placement="right"
                            content={"Super host badge"}
                            color="default"
                            size="sm"
                            delay={1000}
                            className="custome_tooltip info"
                          >
                            <div>
                              <Image
                                alt="super_host_badge"
                                src={super_host_black}
                                className={styles.host_badge}
                                width={20}
                                height={20}
                              />
                            </div>
                          </Tooltip>

                          <span className={styles.super_host_text}>
                            Super host
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <ul className={styles.reservation_details_about_host_and_guest}>
              <li className={styles.reservation_info_details_block}>
                <span className={styles.reservation_details_title}>Host:</span>
                <span className={styles.reservation_details_description}>
                  {host.user_name}
                </span>
              </li>
              <li className={styles.reservation_info_details_block}>
                <span className={styles.reservation_details_title}>
                  Reservator:
                </span>
                <span className={styles.reservation_details_description}>
                  {session?.user.name
                    ? session?.user.name
                    : session?.user.email}
                </span>
              </li>
              {reservationStatus.status === "Complete" &&
                reservationStatus.beenProcessedAt && (
                  <li className={styles.reservation_info_details_block}>
                    <span className={styles.reservation_details_title}>
                      Been reservated at:
                    </span>
                    <span className={styles.reservation_details_description}>
                      {reservationStatus.beenProcessedAt.toLocaleDateString()}
                    </span>
                  </li>
                )}
              {params.get("message") && (
                <li
                  className={`${styles.reservation_info_details_block} ${styles.message_block}`}
                >
                  <span className={styles.reservation_details_title}>
                    Your Message:
                  </span>
                  <p className={styles.reservation_details_description}>
                    {params.get("message")}
                  </p>
                </li>
              )}
            </ul>
            <button
              disabled={reservationStatus.loading!}
              className={styles.next_step_button}
              onClick={
                reservationStatus.success
                  ? () => {}
                  : handleReturnUserToReservePage
              }
            >
              {reservationStatus.success
                ? "Chat with host"
                : "Back to reservation"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
