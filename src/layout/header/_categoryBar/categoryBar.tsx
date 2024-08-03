import React, { Suspense, useEffect } from "react";
import { motion } from "framer-motion";

import styles from "./categoryBar.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";
import {
  Button,
  Modal,
  ModalContent,
  ScrollShadow,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { FilterIcon } from "@/svgs/FilterIcon";

const Categories: React.FC = () => {
  const { categories } = useSelector(
    (state: RootState) => state.listingsAdditionals
  );

  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(
    null
  );
  const selectCategory = (id: number) => {
    setSelectedCategory((prev) => (prev === id ? prev : id));
  };

  return (
    <>
      {categories?.map((category) => (
        <button
          key={category.id}
          className={styles.category}
          onClick={() => selectCategory(category.id)}
          data-selected={selectedCategory === category.id}
        >
          <Image
            src={category.category_icon as string}
            alt={category.category_icon as string}
            width={24}
            height={24}
            className={styles.category_img}
          />
          <span className={styles.category_text}>{category.category_name}</span>
        </button>
      ))}
    </>
  );
};

export const CategoryBar = ({ scrolled }: { scrolled: boolean }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onOpenChange}
        backdrop="opaque"
        size="md"
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
        <ModalContent>
          <div>filters</div>
        </ModalContent>
      </Modal>
      <motion.div
        data-scrolled={scrolled}
        className={styles.category_container}
      >
        <ScrollShadow
          hideScrollBar
          orientation="horizontal"
          className={styles.category_wrap}
        >
          <Categories />
        </ScrollShadow>
        <Button
          className={styles.filter_btn}
          size="md"
          onClick={onOpen}
          data-opened={isOpen}
        >
          <FilterIcon />
          Filter
        </Button>
      </motion.div>
    </>
  );
};
