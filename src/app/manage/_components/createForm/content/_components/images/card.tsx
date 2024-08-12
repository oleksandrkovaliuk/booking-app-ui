import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";

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
  onDelete: (item: string) => void;
  setHeadImageDown?: () => void;
  makeHeadImage?: () => void;
}
export const ImagesCard: React.FC<ImagesCardProps> = ({
  i,
  item,
  isDrag,
  onDelete,
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
      <Modal isOpen={isOpen} onClose={onClose} size="5xl" hideCloseButton>
        <ModalContent>
          <ModalBody className="show_case">
            <div
              style={{ backgroundImage: `url(${item})` }}
              className="show_case_image"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <motion.div
        {...deepAppearAnimation}
        transition={{ delay: 0.15 * i, ease: "easeInOut" }}
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
            classNames={{
              content: ["text-white font-medium bg-[#2f2f2f]"],
            }}
          >
            <button
              className={styles.manage_button}
              onClick={() => onDelete(item)}
            >
              <TrashCan />
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
              classNames={{
                content: ["text-white font-medium  bg-[#2f2f2f]"],
              }}
            >
              <DropdownTrigger>
                <button className={styles.manage_button}>
                  <ThreeDots />
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
