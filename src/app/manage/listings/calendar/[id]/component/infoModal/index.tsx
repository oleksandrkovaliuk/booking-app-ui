import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import styles from "./infoModal.module.scss";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      hideCloseButton
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        <ModalHeader className={styles.modal_header}>
          Important notes before you started!
        </ModalHeader>
        <ModalBody className={styles.modal_body}>
          <div className={styles.modal_content}>
            <p className={styles.modal_text}>
              On this page you will selected which dates you would like to{" "}
              <b>disable</b> for your listing.
            </p>
          </div>
          <div className={styles.modal_content}>
            <p className={styles.modal_text}>
              Your changes wont be applyied until you <b>confirm</b> them with
              the confirmation button on the left bottom.
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} className={styles.modal_button}>
            I got it
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
