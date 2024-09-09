import React, { useEffect, useState } from "react";
import { toast } from "sonner";
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
import { useRequestListingSearchMutation } from "@/store/api/endpoints/listings/getVerifiedListings";

import { FilterIcon } from "@/svgs/FilterIcon";
import { skeletonData } from "@/information/data";
import your_search from "@/assets/loan.png";

import { SEARCH_PARAM_KEYS } from "../_lib/enums";
import { ErrorHandler } from "@/helpers/errorHandler";
import { getSearchSelection } from "../_lib/getSearchSelection";
import { AssignNewQueryParams } from "@/helpers/paramsManagment";

import styles from "./categoryBar.module.scss";

const Categories: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [requestListingSearch] = useRequestListingSearchMutation();
  const { data: categories, isLoading } = useGetListingsCategoriesQuery();

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const requestSearchBySelectedCategory = async (id: number, name: string) => {
    try {
      const searchSelection = getSearchSelection(params, SEARCH_PARAM_KEYS);

      const { data: res, error } = await requestListingSearch({
        search_place: searchSelection[SEARCH_PARAM_KEYS.SEARCH_PLACE]
          ? {
              city: "",
              country: JSON.parse(
                searchSelection[SEARCH_PARAM_KEYS.SEARCH_PLACE]
              ).country,
            }
          : null,
        search_date: null,
        search_amountOfGuests: null,
        search_includePets: null,
        search_category_id: id,
      });

      setSelectedCategory((prev) => (prev === id ? prev : id));
      AssignNewQueryParams({
        updatedParams: {
          [SEARCH_PARAM_KEYS.SEARCH_CATEGORY_ID]: JSON.stringify(id),
        },
        params,
        router,
        pathname,
      });

      if (error || !res) ErrorHandler(error as Error);
    } catch (error) {
      toast(
        `🫣 We couldn't find any listings for category - ${name} in your area. `,
        {
          position: "bottom-center",
          action: {
            label: "Close",
            onClick: () => {},
          },
        }
      );
      setSelectedCategory(null);
      AssignNewQueryParams({
        updatedParams: {
          [SEARCH_PARAM_KEYS.SEARCH_CATEGORY_ID]: JSON.stringify(null),
        },
        params,
        router,
        pathname,
      });
    }
  };

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
              onClick={() =>
                requestSearchBySelectedCategory(
                  category.id,
                  category.category_name
                )
              }
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
  const params = useSearchParams();

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
          {!params.get(SEARCH_PARAM_KEYS.SEARCH_CATEGORY_ID) &&
            params.get(SEARCH_PARAM_KEYS.SEARCH_PLACE) && (
              <div className={`${styles.category} ${styles.search}`}>
                <Image
                  src={your_search}
                  alt="your search"
                  width={24}
                  height={24}
                  className={styles.category_img}
                />
                <span className={styles.category_text}>Your search</span>
              </div>
            )}

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
