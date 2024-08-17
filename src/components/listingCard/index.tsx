import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";

import { ListingCardProps } from "./type";
import { LeftArrow } from "@/svgs/LeftArrow";
import { StatusBadge } from "../statusBadge";
import { RightArrow } from "@/svgs/RightArrow";
import { ManageModalComponent } from "./components/modals/manage";

import "./additional.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./listingCard.module.scss";
import { PreviewModalComponent } from "./components/modals/preview";

export const ListingCard: React.FC<ListingCardProps> = ({
  id,
  images,
  title,
  location,
  description,
  typeOfPlace,
  allowPets,
  accessible,
  guests,
  price,
  isPreview,
  isManagable,
  isPublic,
  isInProccess,
}) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const sliderRef = useRef<Slider | null>(null);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // CONDITIONS
  const isLastSlider = currentSlide === images.length - 1;
  const isFirstSlider = currentSlide === 0;

  const isNotPreview = !isPreview || !isInProccess;
  const isPublicView = !isPreview && !isManagable && isPublic;
  const mainHref = isPublicView
    ? isInProccess
      ? "/manage/listings/create"
      : `/listing/${location?.shorterAddress}/${id}`
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
    e.preventDefault();

    if (e.deltaX > 20) sliderRef.current?.slickNext();
    else if (e.deltaX < -20) sliderRef.current?.slickPrev();
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

  return (
    <>
      {isPreview && (
        <PreviewModalComponent
          isOpen={isOpen}
          onClose={onClose}
          images={images}
          title={title}
          typeOfPlace={typeOfPlace}
          description={description}
          location={location}
          guests={guests}
          allowPets={allowPets}
          accessible={accessible}
        />
      )}
      {isManagable && (
        <ManageModalComponent
          id={id}
          isOpen={isOpen}
          onClose={onClose}
          images={images}
          title={title}
          location={location}
          onOpenChange={onOpenChange}
        />
      )}

      <Link
        href={mainHref}
        className={styles.listing_card}
        data-isnotpreview={isNotPreview}
        data-ismanagable={isManagable}
        onClick={onOpen}
      >
        <div className={styles.slider_container} onWheel={handleWhellScroll}>
          {isInProccess && <StatusBadge status="In progress" color="#ffa836" />}
          {isPreview && (
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
          {isNotPreview && (
            <div className={styles.location}>{location?.shorterAddress}</div>
          )}
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
