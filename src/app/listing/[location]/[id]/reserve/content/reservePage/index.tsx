"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Skeleton,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { today, getLocalTimeZone } from "@internationalized/date";

import { store } from "@/store";
import { getUser } from "@/store/api/endpoints/auth/getUser";
import { useGetCurrentListingQuery } from "@/store/api/endpoints/listings/getCurrentListing";

import { RareDiamondSvg } from "@/svgs/RareDiaomondSvg";
import super_host from "@/assets/medal-of-honor.png";
import super_host_black from "@/assets/medal-of-honor-black.png";

import { RoundButton } from "@/components/roundButton";
import { YourTripBlock } from "./components/yourTripBlock";
import { RulesAndPolicy } from "./components/rulesAndPolicy";
import { PaymantComponent } from "./components/paymantComponent";

import { CountNights, ParseLocalStorageDates } from "@/helpers/dateManagment";
import { CalculatePriceIncludingTax } from "@/helpers/priceManagment";

import { ShowCaseUser } from "@/_utilities/interfaces";
import { ReservePageProps } from "../_lib/interfaces";
import { searchParamsKeys } from "@/layout/header/_lib/enums";

import styles from "./reservePage.module.scss";

export const ReserveContent: React.FC<ReservePageProps> = ({ params }) => {
  const router = useRouter();
  const paramsUrl = useSearchParams();

  const convertedParams = Object.fromEntries(paramsUrl.entries()) as {
    [key in searchParamsKeys]: string;
  };

  const { data: listing } = useGetCurrentListingQuery({
    id: Number(params.id),
  });

  const [host, setHost] = useState<ShowCaseUser>({
    user_name: "",
    email: "",
    img_url: "",
    role: "",
  });
  const [messageToHost, setMessageToHost] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pendingUrl, setPendingUrl] = useState<string>("");

  // CONSTANTS

  const searchDateSelection = convertedParams.search_date
    ? convertedParams.search_date
    : JSON.stringify({
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({ weeks: 1 }),
      });

  const countChosenNightsRange = CountNights(
    ParseLocalStorageDates(searchDateSelection).start,
    ParseLocalStorageDates(searchDateSelection).end
  );
  const calculationOfPrice =
    Number(Number(listing?.price).toLocaleString().split(",").join("")) *
    countChosenNightsRange;

  const handleSetPendingRedirect = (url: string) => {
    if (messageToHost.length > 0) {
      setPendingUrl(url);
      setIsModalOpen(true);
    } else {
      router.push(url);
    }
  };

  const handleConfirmRedirect = () => {
    if (pendingUrl.length) {
      router.push(pendingUrl);
      setIsModalOpen(false);
    }
  };

  const handleCancelRedirect = () => {
    setIsModalOpen(false);
    setPendingUrl("");
  };

  useEffect(() => {
    const setUpPage = async () => {
      const user = await store
        .dispatch(
          getUser.initiate({
            user_name: listing?.host_name!,
            user_email: listing?.host_email!,
          })
        )
        .unwrap();

      setHost((prev) => {
        if (!user.data) return prev;
        return {
          user_name: user.data.user_name,
          email: user.data.user_email,
          img_url: user.data.img_url,
          role: user.data.role,
        };
      });
    };

    if (!listing?.host_email && !listing?.host_name) return;
    setUpPage();
  }, [listing?.host_email, listing?.host_name]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [router]);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        isDismissable
        isKeyboardDismissDisabled
        hideCloseButton
        className={styles.leave_confirmation_modal}
      >
        <ModalContent>
          <ModalBody className={styles.leave_confirmation_modal_body}>
            <span className={styles.leave_confirmation_modal_title}>
              Are you sure you want to leave this page?
            </span>
            <p className={styles.leave_confirmation_modal_description}>
              Your changes will be lost
            </p>
          </ModalBody>
          <ModalFooter className={styles.leave_confirmation_modal_footer}>
            <Button
              size="md"
              variant="light"
              className={styles.clear_btn}
              onClick={handleCancelRedirect}
            >
              Cancel
            </Button>
            <Button
              size="md"
              className={styles.apply_btn}
              onClick={handleConfirmRedirect}
            >
              Leave
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className={styles.reservation_content}>
        {" "}
        <div className={styles.reservation_title_block}>
          <RoundButton
            showToolTip
            action={() => {
              handleSetPendingRedirect(
                `/listing/${params.location}/${params.id}`
              );
            }}
            arrow_direction="left"
            toolTipPlacement={"top"}
            toolTipContent="Back to listing"
            toolTipDelay={200}
          />

          <h1 className={styles.reservation_title}>Confirm and pay</h1>
        </div>
        <div className={styles.reservation_content_container}>
          <section className={styles.left_reservation_info_block}>
            {listing?.disabled_dates?.length! >= 2 && (
              <div className={styles.rare_find}>
                <div className={styles.rare_find_text}>
                  <h4 className={styles.sub_title}>Rare find!</h4>
                  <p
                    className={`${styles.sub_description} ${styles.with_host_name}`}
                  >
                    {!host.user_name ? (
                      <Skeleton className={styles.host_name_skeleton} />
                    ) : (
                      <span className={styles.host_name}>
                        {host.user_name?.split(" ")[0]}
                      </span>
                    )}
                    &apos;s place is usually booked.
                  </p>
                </div>
                <RareDiamondSvg className={styles.rare_diamond_svg} />
              </div>
            )}
            <YourTripBlock disabledDates={listing?.disabled_dates!} />

            <RulesAndPolicy />

            <div className={styles.comment_to_host}>
              <div className={styles.comment_to_host_header}>
                <div className={styles.host_card}>
                  <div className={styles.host_img_container}>
                    {host.img_url ? (
                      <Image
                        src={host.img_url}
                        alt="host_avatar"
                        width={100}
                        height={100}
                        className={styles.host_img}
                      />
                    ) : (
                      <div className={`${styles.host_img} ${styles.host_img}`}>
                        {" "}
                        {host.user_name
                          ? host.user_name.split("")[0]
                          : host.email?.split("")[0]}
                      </div>
                    )}
                    {host.role === "super_host" && (
                      <Tooltip
                        placement="right"
                        content={"Super host badge"}
                        color="default"
                        size="sm"
                        delay={1000}
                        classNames={{
                          content: ["text-#2f2f2f font-medium rounded-lg"],
                        }}
                      >
                        <div>
                          <Image
                            alt="super_host_badge"
                            src={super_host}
                            className={styles.host_badge}
                            width={100}
                            height={100}
                          />
                        </div>
                      </Tooltip>
                    )}
                  </div>
                  <div className={styles.host_info}>
                    <h3 className={styles.host_name}>
                      <span>{host.user_name?.split(" ")[0]}</span>
                    </h3>
                    <p className={styles.host_type}>
                      {host.role === "super_host" ? "Super Host" : "Host"}
                    </p>
                  </div>
                </div>

                <div className={styles.comment_to_host_text}>
                  <span className={styles.sub_title}>
                    Would you like to leave a comment to the host?
                  </span>
                  <p className={styles.sub_description}>
                    Share any feedback or thoughts for the host to improve your
                    experience!
                  </p>
                </div>
              </div>

              <Textarea
                variant="bordered"
                className="additional_details"
                placeholder="..."
                value={messageToHost}
                onValueChange={setMessageToHost}
                classNames={{ input: styles.comment_to_host_textarea }}
              />
            </div>

            <PaymantComponent />
          </section>
          <section className={styles.right_reservation_info_block}>
            {!convertedParams || isNaN(calculationOfPrice) ? (
              <Skeleton className={styles.reservation_listing_info_skeleton} />
            ) : (
              <ul className={styles.reservation_listing_info}>
                <li className={styles.reservation_listing_title_info}>
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
                            classNames={{
                              content: ["text-#2f2f2f font-medium rounded-lg"],
                            }}
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
                </li>
                <li className={styles.price_details}>
                  <h3 className={styles.title}>Price details</h3>

                  <div className={styles.calculate_price_block}>
                    <span className={styles.price_label}>
                      ${Number(listing?.price).toLocaleString()} x{" "}
                      {countChosenNightsRange} night
                    </span>
                    <span className={styles.price_result}>
                      ${calculationOfPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className={styles.calculate_price_block}>
                    <span className={styles.price_label}>Cleaning fee</span>
                    <span className={styles.price_result}>
                      $
                      {CalculatePriceIncludingTax(
                        calculationOfPrice
                      ).with_cleaning_fee.toLocaleString()}
                    </span>
                  </div>

                  <div className={styles.calculate_price_block}>
                    <span className={styles.price_label}>Spacer fee</span>
                    <span className={styles.price_result}>
                      $
                      {CalculatePriceIncludingTax(
                        calculationOfPrice
                      ).with_service_fee.toLocaleString()}
                    </span>
                  </div>

                  <div className={styles.calculate_price_block}>
                    <span className={styles.price_label}>Taxes</span>
                    <span className={styles.price_result}>
                      $
                      {CalculatePriceIncludingTax(
                        calculationOfPrice
                      ).with_taxes.toLocaleString()}
                    </span>
                  </div>

                  <div className={styles.calculate_total_block}>
                    <span className={styles.price_label}>Total</span>
                    <span className={styles.price_result}>
                      $
                      {CalculatePriceIncludingTax(
                        calculationOfPrice
                      ).total_price.toLocaleString()}
                    </span>
                  </div>
                </li>
              </ul>
            )}
          </section>
        </div>
      </div>
    </>
  );
};
