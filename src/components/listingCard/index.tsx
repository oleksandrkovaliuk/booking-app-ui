import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import Slider from "react-slick";
import { useSession } from "next-auth/react";

import { LeftArrow } from "@/svgs/LeftArrow";
import { RightArrow } from "@/svgs/RightArrow";
import { ListingCardProps } from "./type";

import "./additional.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./listingCard.module.scss";
import Link from "next/link";
import { StatusBadge } from "../statusBadge";

export const ListingCard: React.FC<ListingCardProps> = ({
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
  isInProccess,
}) => {
  const { data: session } = useSession();

  const sliderRef = useRef<Slider | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // CONDITIONS
  const isLastSlider = currentSlide === images.length - 1;
  const isFirstSlider = currentSlide === 0;

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

  console.log(images, "check");
  return (
    <>
      {isPreview && (
        <Modal size="5xl" isOpen={isOpen} onClose={onClose} className="modal">
          <ModalContent>
            <ModalHeader className="modal_header">Full preview</ModalHeader>
            <ModalBody className="modal_body">
              <Image
                src={images[0]}
                alt="preview"
                width={1000}
                height={600}
                className="modal_listing_image"
              />
              <ul className="modal_info">
                <li className="modal_info_item">
                  <div className="modal_info_title">{title}</div>
                </li>
                <li className="modal_info_item host">
                  <div className="modal_hosted_by">
                    <div className="modal_info_title">
                      {typeOfPlace} hosted by{" "}
                      <span>
                        {" "}
                        {session?.user.name &&
                          `, ${session?.user?.name?.split(" ")[0]}`}
                      </span>
                      !
                    </div>
                    <div className="modal_hosted_additional_info">
                      <p className="modal_info_description">{guests} guests</p>
                      {allowPets && (
                        <p className="modal_info_description">Pets allowed</p>
                      )}
                      {accessible && (
                        <p className="modal_info_description">Accessible</p>
                      )}
                    </div>
                  </div>
                  <Image
                    src={session?.user.image!}
                    alt="user"
                    width={50}
                    height={50}
                    className="modal_hosted_by_image"
                  />
                </li>
                <li className="modal_info_item description">
                  <p className="modal_info_description">{description}</p>
                </li>
                <li className="modal_info_item location">
                  <div className="modal_info_title">Location</div>
                  <p className="modal_info_description">{location}</p>
                  <p className="modal_info_description">
                    We’ll only share your address with guests who are booked.
                  </p>
                </li>
              </ul>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      <Link
        href={isInProccess ? "/manage/listings/create" : "#"}
        className={styles.listing_card}
      >
        <div
          className={styles.slider_container}
          onWheel={handleWhellScroll}
          onClick={isPreview ? onOpen : () => null}
        >
          {isInProccess && <StatusBadge status="In progress" color="#ffa836" />}
          {isPreview && (
            <span className={styles.show_preview}>show preview</span>
          )}
          <Slider {...options} ref={sliderRef}>
            {images.map((image) => (
              <div key={image} className={styles.slider_content}>
                <div
                  className={styles.slider_image}
                  style={{ backgroundImage: `url(${image})` }}
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
          <h5 className={styles.title}>{title}</h5>
          <span className={styles.price}>
            <b>${price}</b> night
          </span>
        </div>
      </Link>
    </>
  );
};
