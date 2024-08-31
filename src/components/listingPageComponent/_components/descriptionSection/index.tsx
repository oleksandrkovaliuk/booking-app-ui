import React from "react";

import styles from "./descriptionSection.module.scss";
import { ListingState } from "@/app/api/apiCalls";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Arrow } from "@/svgs/RightArrow";

export const DescriptionSection: React.FC<{
  aboutplace: ListingState["aboutplace"];
  placeis: ListingState["placeis"];
  notes: ListingState["notes"];
}> = ({ aboutplace, placeis, notes }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const isAboutPlaceTextTooLong = aboutplace?.split(" ").length! > 300;

  return (
    <>
      <Modal
        size="3xl"
        isOpen={isOpen}
        onClose={onClose}
        className={styles.full_information_modal}
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
        backdrop="opaque"
      >
        <ModalContent className={styles.modal_content}>
          <ModalBody className={styles.modal_body}>
            <ul className={styles.modal_info}>
              {aboutplace && (
                <li className={styles.modal_info_item}>
                  <h3 className={styles.modal_info_title}>About the place</h3>
                  <p className={styles.modal_info_description}>{aboutplace}</p>
                </li>
              )}
              {placeis && (
                <li className={styles.modal_info_item}>
                  <h3 className={styles.modal_info_title}>This place is</h3>
                  <p className={styles.modal_info_description}>{placeis}</p>
                </li>
              )}
              {notes && (
                <li className={styles.modal_info_item}>
                  <h3 className={styles.modal_info_title}>Important notes</h3>
                  <p className={styles.modal_info_description}>{notes}</p>
                </li>
              )}
            </ul>
          </ModalBody>
        </ModalContent>
      </Modal>
      <section className={styles.description_section}>
        <p
          className={styles.description}
          data-content-to-long={isAboutPlaceTextTooLong}
        >
          {aboutplace}
        </p>
        <button className={styles.show_more_btn} onClick={onOpen}>
          Show more ...
        </button>
      </section>
    </>
  );
};
