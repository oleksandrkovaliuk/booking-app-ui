import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import { useDisclosure } from "@nextui-org/react";

import { LeftArrow } from "@/svgs/LeftArrow";
import { RightArrow } from "@/svgs/RightArrow";

import { StatusBadge } from "../statusBadge";
import { ManageModal } from "./components/modals/manage";
import { PreviewModal } from "./components/modals/preview";

import { ListingCardProps } from "./type";

import "./additional.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./listingCard.module.scss";

export const ListingCard: React.FC<ListingCardProps> = ({
  id,
  images,
  title,
  address,
  aboutplace,
  type,
  pets_allowed,
  accesable,
  guests,
  price,
  isPreview,
  isComplete,
  isManagable,
  isPublic,
  isInProccess,
}) => {
  const sliderRef = useRef<Slider | null>(null);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [listingHasUnsavedChanges, setListingHasUnsavedChanges] =
    useState(false);

  // CONDITIONS
  const isLastSlider = currentSlide === images.length - 1;
  const isFirstSlider = currentSlide === 0;

  const mainHref = !isPreview
    ? !isPublic && isInProccess
      ? "/manage/listings/create"
      : `/listing/${address?.shorterAddress}/${id}`
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

  const handleWhellScroll = (e: React.WheelEvent) => {
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

    if (unsavedData && JSON.parse(unsavedData || "[]")?.length) {
      setListingHasUnsavedChanges(true);
    }
  }, [id]);

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
          onOpenChange={onOpenChange}
        />
      )}

      <Link
        href={isManagable ? "#" : mainHref}
        className={styles.listing_card}
        data-ismanagable={isManagable}
        onClick={onOpen}
      >
        <div className={styles.slider_container} onWheel={handleWhellScroll}>
          {isInProccess && <StatusBadge status="In progress" color="#ffa836" />}
          {!isComplete && !isInProccess && !isPublic && !isPreview && (
            <StatusBadge
              status="Required avalability approval"
              color="#800000"
            />
          )}
          {isComplete && listingHasUnsavedChanges && (
            <StatusBadge status="Unsaved changes" color="#ffa836" />
          )}
          {isPreview && !isManagable && (
            <span className={styles.show_preview}>show preview</span>
          )}

          <Slider {...options} ref={sliderRef}>
            {images.map((image) => (
              <div key={image.url} className={styles.slider_content}>
                <div
                  className={styles.slider_image}
                  style={{ backgroundImage: `url(${image.url})` }}
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
            <LeftArrow />
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
            <RightArrow />
          </button>
        </div>
        <div className={styles.listing_info}>
          <div className={styles.location}>{address?.shorterAddress}</div>

          <h5 className={styles.title}>{title}</h5>
          <span className={styles.price}>
            <b>
              ${isNaN(Number(price)) ? price : Number(price).toLocaleString()}
            </b>{" "}
            night
          </span>
        </div>
      </Link>
    </>
  );
};
