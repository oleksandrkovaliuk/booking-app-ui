import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";

import { ShowMoreIcon } from "@/svgs/ShowMoreIcon";

import { RoundButton } from "@/components/roundButton";

import styles from "./imagesSection.module.scss";

export const ImagesSection: React.FC<{
  isPublic: boolean;
  images: { url: string }[];
}> = ({ images, isPublic }) => {
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
            <RoundButton
              showToolTip
              action={onClose}
              arrow_direction="left"
              toolTipPlacement={"right"}
              toolTipContent="Close"
              toolTipDelay={200}
            />
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
      <section className={styles.images_section} data-is-not-public={!isPublic}>
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
          <span>Show all photos</span>
        </Button>
      </section>
    </>
  );
};
