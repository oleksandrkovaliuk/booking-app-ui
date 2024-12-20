import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import { useSearchParams } from "next/navigation";
import { useDisclosure } from "@nextui-org/react";

import { useSelector } from "@/store";
import { searchSelectionSelector } from "@/store/selectors/searchSelection";

import { Arrow } from "@/svgs/Arrow";

import { StatusBadge } from "../statusBadge";
import { ManageModal } from "./components/modals/manage";
import { PreviewModal } from "./components/modals/preview";

import { CalculatePriceIncludingTax } from "@/helpers/priceManagment";
import { CountNights, ParseLocalStorageDates } from "@/helpers/dateManagment";
import { formattedAddressComponent } from "@/helpers/address/formattedAddressVariants";

import { IListingCardProps } from "./type";
import { searchParamsKeys } from "@/layout/header/_lib/enums";

import "./additional.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./listingCard.module.scss";
import Image from "next/image";

export const ListingCard: React.FC<IListingCardProps> = ({
  id,
  type,
  title,
  price,
  guests,
  images,
  address,
  isPublic,
  isPreview,
  accesable,
  isComplete,
  aboutplace,
  isManagable,
  isInProccess,
  pets_allowed,
}) => {
  const params = useSearchParams();

  const sliderRef = useRef<Slider | null>(null);
  const SliderContainerRef = useRef<HTMLDivElement | null>(null);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [listingHasUnsavedChanges, setListingHasUnsavedChanges] = useState<{
    is_edit: boolean;
    is_availability: boolean;
    unsaved_changes: boolean;
  }>({
    is_edit: false,
    is_availability: false,
    unsaved_changes: false,
  });

  const { parsedSearchDate } = useSelector(searchSelectionSelector(params));

  const calculateNights =
    parsedSearchDate &&
    CountNights(parsedSearchDate.start, parsedSearchDate.end);
  // CONDITIONS
  const isPreviewCard = isPreview && !isManagable;
  const isRequiredAvailability =
    !isComplete && !isInProccess && !isPublic && !isPreview;

  const hasUnsavedChanges =
    isComplete && isManagable && listingHasUnsavedChanges.unsaved_changes;

  const showTotalPrice =
    params.get(searchParamsKeys.SEARCH_DATE) &&
    isPublic &&
    !isManagable &&
    !isPreview &&
    !isInProccess &&
    price &&
    calculateNights;

  const isLastSlider = currentSlide === images?.length - 1;
  const isFirstSlider = currentSlide === 0;

  const preparedListingLocation = formattedAddressComponent({
    detailedAddressComponent: address?.detailedAddressComponent,
    variant: "country",
  });

  const preparedRedirectParams = params
    ? `/listing/${preparedListingLocation}/${id}?${params.toString()}`
    : `/listing/${preparedListingLocation}/${id}`;

  const mainHref = !isPreview
    ? !isPublic && isInProccess
      ? "/manage/listings/create"
      : preparedRedirectParams
    : "#";

  // OPTIONS
  const options = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    swipe: true,
    touchMove: true,

    afterChange: (current: number) => setCurrentSlide(current),
  };

  const handleWheelScroll = (e: React.WheelEvent) => {
    if (e.deltaX > 10) sliderRef.current?.slickNext();
    else if (e.deltaX < -10) sliderRef.current?.slickPrev();
  };

  useEffect(() => {
    const sliderContainer = sliderRef.current?.innerSlider?.list;

    const handleWheelEvent = (e: WheelEvent) =>
      e.deltaX !== 0 && e.preventDefault();

    sliderContainer?.addEventListener("wheel", handleWheelEvent, {
      passive: false,
    });
    return () => {
      sliderContainer?.removeEventListener("wheel", handleWheelEvent);
    };
  }, []);

  useEffect(() => {
    const unsavedData = localStorage.getItem(`${id}`);
    const unsavedEditData = localStorage.getItem(`${id}isAnyUnsavedChanges`);

    if (unsavedData && JSON.parse(unsavedData || "[]")?.length) {
      setListingHasUnsavedChanges((prev) => ({
        ...prev,
        is_availability: true,
        unsaved_changes: true,
      }));
    }
    if (unsavedEditData && JSON.parse(unsavedEditData)) {
      setListingHasUnsavedChanges((prev) => ({
        ...prev,
        is_edit: true,
        unsaved_changes: true,
      }));
    }
  }, [id]);

  useEffect(() => {
    if (!isComplete && !isInProccess && !isPreview) {
      onOpen();
    }
  }, [isComplete, isInProccess, isPreview, onOpen]);
  return (
    <>
      {isPreview && (
        <PreviewModal
          isOpen={isOpen}
          onClose={onClose}
          images={images}
          title={title}
          type={type}
          aboutplace={aboutplace}
          address={address}
          guests={guests}
          pets_allowed={pets_allowed}
          accesable={accesable}
        />
      )}
      {isManagable && (
        <ManageModal
          id={id}
          isOpen={isOpen}
          onClose={onClose}
          images={images}
          title={title}
          address={address}
          isComplete={isComplete}
          isInProccess={isInProccess}
          listingHasUnsavedChanges={listingHasUnsavedChanges}
          onOpenChange={onOpenChange}
        />
      )}

      <Link
        href={isManagable ? "#" : mainHref}
        className={styles.listing_card}
        data-ismanagable={isManagable}
        target={isPublic ? "_blank" : "_self"}
        onClick={onOpen}
      >
        <div
          ref={SliderContainerRef}
          className={styles.slider_container}
          onWheel={handleWheelScroll}
        >
          {isInProccess && <StatusBadge status="In progress" color="#ffa836" />}
          {isRequiredAvailability && (
            <StatusBadge
              status="Required avalability approval"
              color="#800000"
            />
          )}
          {hasUnsavedChanges && (
            <StatusBadge status="Unsaved changes" color="#ffa836" />
          )}
          {isPreviewCard && (
            <span className={styles.show_preview}>show preview</span>
          )}

          <Slider {...options} ref={sliderRef}>
            {images?.map((image, i) => (
              <div key={image.url} className={styles.slider_content}>
                <Image
                  src={image.url}
                  width={300}
                  height={300}
                  loading="lazy"
                  alt={`${title + i}`}
                  className={styles.slider_image}
                />
              </div>
            ))}
          </Slider>
          <button
            className={`${styles.slider_arrows} ${styles.prev}`}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              sliderRef.current?.slickPrev();
            }}
            disabled={isFirstSlider}
          >
            <Arrow />
          </button>
          <button
            className={`${styles.slider_arrows} ${styles.next}`}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              sliderRef.current?.slickNext();
            }}
            disabled={isLastSlider}
          >
            <Arrow />
          </button>
        </div>
        <div className={styles.listing_info}>
          <div className={styles.location}>
            {formattedAddressComponent({
              detailedAddressComponent: address?.detailedAddressComponent,
              variant: "neighboorhoodStateCountry",
            })}
          </div>

          <h5 className={styles.title}>{title}</h5>
          {!isManagable && price && (
            <div className={styles.price}>
              <span>
                <b>
                  $
                  {Number.isNaN(Number(price))
                    ? Number(price.split(",").join("")).toLocaleString()
                    : price.toLocaleString()}
                </b>{" "}
                night
              </span>
              {showTotalPrice && (
                <span className={styles.total}>
                  $
                  {CalculatePriceIncludingTax(
                    Number(price) * calculateNights
                  ).total_price.toLocaleString()}{" "}
                  total
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </>
  );
};
