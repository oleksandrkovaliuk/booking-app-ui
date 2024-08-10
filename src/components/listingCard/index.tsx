import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";

import { LeftArrow } from "@/svgs/LeftArrow";
import { RightArrow } from "@/svgs/RightArrow";
import { ListingCardProps } from "./type";

import "./slider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./listingCard.module.scss";
import {
  appearAnimation,
  motion_transition,
} from "@/app/manage/_components/consts";

export const ListingCard: React.FC<ListingCardProps> = ({ images }) => {
  const sliderRef = useRef<Slider | null>(null);

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

  return (
    <div className={styles.listing_card}>
      <div className={styles.slider_container} onWheel={handleWhellScroll}>
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
            e.preventDefault();
            sliderRef.current?.slickNext();
          }}
          disabled={isLastSlider}
        >
          <RightArrow />
        </button>
      </div>
    </div>
  );
};
