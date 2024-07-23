import React, { Suspense, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

import styles from "./categoryBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { GetListingsCategories } from "@/app/api/apiCalls";
import { setCategories } from "@/store/slices/categories";
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
  const { categories } = useSelector((state: RootState) => state.categories);
  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(
    null
  );

  const selectCategory = (id: number) => {
    setSelectedCategory((prev) => (prev === id ? prev : id));
  };
  return (
    <>
      {categories.map((category) => (
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

export const CategoryBar = ({
  mobile,
  scrolled,
  header_height,
}: {
  mobile: boolean;
  scrolled: boolean;
  header_height: number;
}) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getCategories = useCallback(async () => {
    try {
      const res = await GetListingsCategories();
      dispatch(setCategories(res.data));
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, [dispatch]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

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
        initial={{ top: mobile ? `${header_height}px` : `${195}px` }}
        animate={
          scrolled && {
            top: mobile ? `${header_height}px` : `${132}px`,
          }
        }
      >
        <ScrollShadow
          hideScrollBar
          orientation="horizontal"
          className={styles.category_wrap}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <Categories />
          </Suspense>
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
