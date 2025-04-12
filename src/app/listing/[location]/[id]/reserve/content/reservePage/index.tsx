"use client";
import React, { useEffect, useRef, useState } from "react";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { store, useSelector } from "@/store";
import { getUser } from "@/store/api/endpoints/auth/getUser";
import { searchSelectionSelector } from "@/store/selectors/searchSelection";
import { useGetCurrentListingQuery } from "@/store/api/endpoints/listings/getCurrentListing";

import super_host from "@/assets/medal-of-honor.png";
import { RareDiamondSvg } from "@/svgs/RareDiaomondSvg";
import super_host_black from "@/assets/medal-of-honor-black.png";

import { RoundButton } from "@/components/roundButton";
import { YourTripBlock } from "./components/yourTripBlock";
import { RulesAndPolicy } from "./components/rulesAndPolicy";
import { PaymantComponent } from "./components/paymantComponent";

import { CountNights } from "@/helpers/dateManagment";
import { CalculatePriceIncludingTax } from "@/helpers/priceManagment";

import { useDebounce } from "@/hooks/useDebounce";
import { IReservePageProps } from "../_lib/interfaces";
import { IShowCaseUser } from "@/_utilities/interfaces";
import { CreateNewQueryParams } from "@/helpers/paramsManagment";

import styles from "./reservePage.module.scss";

export const ReserveContent: React.FC<IReservePageProps> = ({
  params,
  listing,
  listingHost,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const paramsUrl = useSearchParams();

  const { parsedSearchDate } = useSelector(searchSelectionSelector(paramsUrl));

  const [messageToHost, setMessageToHost] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pendingUrl, setPendingUrl] = useState<string>("");

  // CONSTANTS

  const countChosenNightsRange = CountNights(
    parsedSearchDate.start,
    parsedSearchDate.end
  );
  const calculationOfPrice =
    Number(Number(listing?.price).toLocaleString().split(",").join("")) *
    countChosenNightsRange;

  const assignMessageToHost = () => {
    const updatedParams = CreateNewQueryParams({
      updatedParams: {
        message: messageToHost,
      },
      params: paramsUrl,
    });

    router.replace(`${pathname}?${updatedParams}`, {
      scroll: false,
    });
  };

  const debaouncedAssignMessageToHost = useDebounce(assignMessageToHost, 500);

  const handleSetPendingRedirect = (url: string) => {
    if (paramsUrl.get("message")) {
      setPendingUrl(url);
      setIsModalOpen(true);
    } else {
      router.push(url);
    }
  };

  const handleConfirmRedirect = () => {
    if (pendingUrl.length || paramsUrl.get("payment_proccesing")) {
      router.push(pendingUrl);
      setIsModalOpen(false);
    }
  };

  const handleCancelRedirect = () => {
    setIsModalOpen(false);
    setPendingUrl("");
  };

  useEffect(() => {
    const updatedParams = CreateNewQueryParams({
      updatedParams: {
        host_email: null,
        payment_intent: null,
        payment_intent_client_secret: null,
        redirect_status: null,
        disabled_dates: null,
        result: null,
        res_message: null,
      },
      params: paramsUrl,
    });

    router.push(`${pathname}?${updatedParams}`, {
      scroll: false,
    });
  }, [paramsUrl, pathname, router]);

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
              Stay
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
                  <div
                    className={`${styles.sub_description} ${styles.with_host_name}`}
                  >
                    {!listingHost.user_name ? (
                      <Skeleton className={styles.host_name_skeleton} />
                    ) : (
                      <span className={styles.host_name}>
                        {listingHost.user_name}
                      </span>
                    )}
                    &apos;s place is usually booked.
                  </div>
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
                    {listingHost.img_url ? (
                      <Image
                        src={listingHost.img_url}
                        alt="host_avatar"
                        width={100}
                        height={100}
                        className={styles.host_img}
                      />
                    ) : (
                      <div
                        className={`${styles.host_img} ${styles.no_host_img}`}
                      >
                        {" "}
                        {listingHost.user_email.split("")[0]}
                      </div>
                    )}
                    {listingHost.role === "super_host" && (
                      <Tooltip
                        placement="right"
                        content={"Super host badge"}
                        color="default"
                        size="sm"
                        delay={1000}
                        className="custome_tooltip info"
                      >
                        <Image
                          alt="super_host_badge"
                          src={super_host}
                          className={styles.host_badge}
                          width={100}
                          height={100}
                        />
                      </Tooltip>
                    )}
                  </div>
                  <div className={styles.host_info}>
                    <h3 className={styles.host_name}>
                      <span>{listingHost.user_name}</span>
                    </h3>
                    <p className={styles.host_type}>
                      {listingHost.role === "super_host"
                        ? "Super Host"
                        : "Host"}
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
                onValueChange={(value: string) => {
                  setMessageToHost(value);
                  debaouncedAssignMessageToHost();
                }}
                classNames={{ input: styles.comment_to_host_textarea }}
              />
            </div>
            <PaymantComponent
              total={calculationOfPrice}
              host_email={listingHost?.user_email!}
              listing_id={JSON.parse(params.id)}
            />
          </section>
          <section className={styles.right_reservation_info_block}>
            {!parsedSearchDate || Number.isNaN(calculationOfPrice) ? (
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
                      {listingHost.role === "superhost" && (
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
