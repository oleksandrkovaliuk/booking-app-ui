import React from "react";
import { motion } from "framer-motion";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";

import { LoadingValue } from "./type";
import { TrashCan } from "@/svgs/TrashCan";
import { ThreeDots } from "@/svgs/ThreeDots";
import { deepAppearAnimation } from "@/app/manage/_components/consts";

import styles from "./card.module.scss";
import "./additionalStyles.scss";

interface ImagesCardProps {
  i: number;
  item: string;
  isDrag?: boolean;
  isProccessing: boolean;
  isImgsProcessing: LoadingValue["deletingImages"];
  onDelete: (item: string) => void;
  setHeadImageDown?: () => void;
  makeHeadImage?: () => void;
}
export const ImagesCard: React.FC<ImagesCardProps> = ({
  i,
  item,
  isDrag,
  onDelete,
  isImgsProcessing,
  isProccessing,
  makeHeadImage,
  setHeadImageDown,
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleShowFullImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (isProccessing || isDrag) return;
    onOpen();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="5xl"
        hideCloseButton
        className="show_case_modal"
      >
        <ModalContent>
          <ModalBody>
            <div
              style={{ backgroundImage: `url(${item})` }}
              className="show_case_image"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <motion.div
        {...deepAppearAnimation}
        transition={{ delay: 0.05 * i, ease: "easeInOut" }}
        data-isprocessing={isProccessing}
        className={styles.image_container}
        style={{ backgroundImage: `url(${item})` }}
        onClick={handleShowFullImage}
      >
        {isProccessing ? (
          <Tooltip
            placement="top"
            content={"Delete"}
            color="primary"
            size="sm"
            delay={1500}
            className="custome_tooltip black"
          >
            <button
              className={styles.manage_button}
              disabled={
                isImgsProcessing.status && isImgsProcessing.item === item
              }
              onClick={() => onDelete(item)}
            >
              {isImgsProcessing.status && isImgsProcessing.item === item ? (
                <Spinner color="default" size="sm" />
              ) : (
                <TrashCan />
              )}
            </button>
          </Tooltip>
        ) : (
          <Dropdown placement="bottom-end" className="dropdown">
            <Tooltip
              placement="top"
              content={"Manage"}
              color="primary"
              size="sm"
              delay={1500}
              className="custome_tooltip black"
            >
              <DropdownTrigger>
                <button
                  className={styles.manage_button}
                  disabled={
                    isImgsProcessing.status && isImgsProcessing.item === item
                  }
                >
                  {isImgsProcessing.status && isImgsProcessing.item === item ? (
                    <Spinner color="default" size="sm" />
                  ) : (
                    <ThreeDots />
                  )}
                </button>
              </DropdownTrigger>
            </Tooltip>

            {i === 0 ? (
              <DropdownMenu variant="faded" className="dropdown_menu">
                <DropdownItem
                  key="down"
                  className="dropdown_item"
                  onClick={setHeadImageDown}
                >
                  Move down
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="dropdown_item"
                  onClick={() => onDelete(item)}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            ) : (
              <DropdownMenu variant="faded" className="dropdown_menu">
                <DropdownItem
                  key="head"
                  className="dropdown_item"
                  onClick={makeHeadImage}
                >
                  Make head image
                </DropdownItem>
                <DropdownItem
                  key="down"
                  className="dropdown_item"
                  onClick={setHeadImageDown}
                >
                  Move down
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="dropdown_item"
                  onClick={() => onDelete(item)}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            )}
          </Dropdown>
        )}

        {i === 0 && !isProccessing && (
          <span className={styles.head_badge}>Head image</span>
        )}
      </motion.div>
    </>
  );
};
