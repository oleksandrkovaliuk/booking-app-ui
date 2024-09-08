import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Button,
  Modal,
  ModalContent,
  ScrollShadow,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";

import { useGetListingsCategoriesQuery } from "@/store/api/endpoints/listings/getCategories";

import { FilterIcon } from "@/svgs/FilterIcon";
import { skeletonData } from "@/information/data";

import { SEARCH_PARAM_KEYS } from "../_lib/enums";
import { updateAndStoreQueryParams } from "@/helpers/paramsManagment";

import styles from "./categoryBar.module.scss";

const Categories: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const { data: categories, isLoading } = useGetListingsCategoriesQuery();

  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(
    null
  );
  const selectCategory = (id: number) => {
    setSelectedCategory((prev) => (prev === id ? prev : id));
  };

  useEffect(() => {
    if (params.get(SEARCH_PARAM_KEYS.SEARCH_CATEGORY)) {
      setSelectedCategory(
        Number(params.get(SEARCH_PARAM_KEYS.SEARCH_CATEGORY))
      );
    }
  }, [params]);

  return (
    <>
      {isLoading || !categories?.length
        ? skeletonData?.map((item) => (
            <div className={styles.skeleton_macket} key={item}>
              <Skeleton className={styles.skeleton}>
                <div className={styles.skeleton_img} />
              </Skeleton>
              <Skeleton className={styles.skeleton}>
                <div className={styles.skeleton_text} />
              </Skeleton>
            </div>
          ))
        : categories?.map((category) => (
            <button
              key={category.id}
              className={styles.category}
              onClick={() => {
                selectCategory(category.id);
                updateAndStoreQueryParams({
                  updatedParams: {
                    [SEARCH_PARAM_KEYS.SEARCH_CATEGORY]: JSON.stringify(
                      category.id
                    ),
                  },
                  pathname,
                  params,
                  router,
                });
              }}
              data-selected={selectedCategory === category.id}
            >
              <Image
                src={category.category_icon as string}
                alt={category.category_icon as string}
                width={24}
                height={24}
                className={styles.category_img}
              />
              <span className={styles.category_text}>
                {category.category_name}
              </span>
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
        className={styles.category_container}
        data-scrolled={scrolled}
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
