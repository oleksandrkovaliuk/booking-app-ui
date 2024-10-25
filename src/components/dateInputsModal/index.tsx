import React, { useState } from "react";

import { Modal, ModalBody, ModalContent } from "@nextui-org/react";

import { useSelector } from "@/store";
import { isWidthHandlerSelector } from "@/store/selectors/isWidthHandler";

import { ModalComponent } from "./components/modalComponent";
import { DateInputsPicker } from "./components/dateInputsPicker";

import { IDateInputsModalProps } from "./_lib/interfaces";

import styles from "./dateInputsModal.module.scss";

export const DateInputsModal: React.FC<IDateInputsModalProps> = ({
  isSeparateModal,
  disabledDates,
  inputSelection,
  setInputSelection,
}) => {
  const { desktop } = useSelector(isWidthHandlerSelector);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      {isModalOpen && desktop && !isSeparateModal ? (
        <ModalComponent
          disabledDates={disabledDates}
          setIsModalOpen={setIsModalOpen}
          inputSelection={inputSelection}
          isSeparateModal={isSeparateModal}
          setInputSelection={setInputSelection}
        />
      ) : (
        <Modal
          size={isSeparateModal ? "3xl" : "xl"}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          backdrop="opaque"
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                y: 20,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeIn",
                },
              },
            },
          }}
        >
          <ModalContent className={styles.mobile_modal_container}>
            <ModalBody>
              <ModalComponent
                disabledDates={disabledDates}
                inputSelection={inputSelection}
                setIsModalOpen={setIsModalOpen}
                isSeparateModal={isSeparateModal}
                setInputSelection={setInputSelection}
              >
                <DateInputsPicker
                  isModalOpen={isModalOpen}
                  isSeparateModal={isSeparateModal}
                  setIsModalOpen={setIsModalOpen}
                  inputSelection={inputSelection}
                  setInputSelection={setInputSelection}
                />
              </ModalComponent>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {!isSeparateModal ? (
        <DateInputsPicker
          isModalOpen={isModalOpen}
          isSeparateModal={isSeparateModal}
          setIsModalOpen={setIsModalOpen}
          inputSelection={inputSelection}
          setInputSelection={setInputSelection}
        />
      ) : (
        <button
          className={styles.edit_button}
          onClick={() => {
            setInputSelection("checkIn");
            setIsModalOpen(true);
          }}
        >
          Edit
        </button>
      )}
    </>
  );
};
