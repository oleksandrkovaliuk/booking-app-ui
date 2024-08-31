import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ScrollShadow,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Arrow } from "@/svgs/RightArrow";

import styles from "./imagesSection.module.scss";
import { ShowMoreIcon } from "@/svgs/ShowMoreIcon";

export const ImagesSection: React.FC<{
  images: { url: string }[];
  aboutplace: string;
  placeis: string;
}> = ({ images }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Modal
        size="full"
        isOpen={isOpen}
        onClose={onClose}
        className={styles.show_case_modal}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.2,
                ease: "easeOut",
              },
            },
            exit: {
              y: 60,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        hideCloseButton
        backdrop="transparent"
      >
        <ModalContent>
          <ModalHeader>
            <button className={styles.close_btn} onClick={onClose}>
              <Arrow className={styles.close_icon} />
            </button>
          </ModalHeader>

          <div className={styles.show_case_container}>
            <ModalBody className={styles.show_case_wrap}>
              <div className={styles.show_case_images_wrap}>
                {images.map((img, i) => (
                  <Image
                    key={`image-${i}`}
                    src={img.url}
                    alt={img.url}
                    width={1000}
                    height={600}
                    className={`${styles.show_case_image} ${
                      i % 3 === 0 ? styles.everythird : ""
                    }`}
                  />
                ))}
              </div>
            </ModalBody>
          </div>
        </ModalContent>
      </Modal>
      <section className={styles.images_section}>
        <div className={styles.head_image}>
          <div
            style={{ backgroundImage: `url(${images[0].url})` }}
            className={`${styles.image} `}
          />
        </div>
        <div className={styles.images}>
          {[...images].splice(1, 4)?.map((img, i) => (
            <div
              key={`image-${i}`}
              style={{ backgroundImage: `url(${img.url})` }}
              className={`${styles.image}
              ${i === 1 ? styles.right_top : ""} ${
                i === 3 ? styles.right_bottom : ""
              } `}
            />
          ))}
        </div>
        <Button
          size="sm"
          variant="flat"
          className={styles.show_all_btn}
          onClick={onOpen}
        >
          <ShowMoreIcon className={styles.show_all_icon} />
          Show all photos
        </Button>
      </section>
    </>
  );
};
