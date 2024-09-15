import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ScrollShadow, Skeleton } from "@nextui-org/react";

import {
  useGetListingsCategoriesQuery,
  useRequestAvailableCategoriesMutation,
} from "@/store/api/endpoints/listings/getCategories";
import { useRequestListingSearchMutation } from "@/store/api/endpoints/listings/getVerifiedListings";

import { skeletonData } from "@/information/data";
import your_search from "@/assets/loan.png";

import {
  useIsSearchTriggeredApi,
  useIsSearchTriggeredData,
} from "@/app/_lib/context";
import { SEARCH_PARAM_KEYS } from "../_lib/enums";
import { ErrorHandler } from "@/helpers/errorHandler";

import { getSearchSelection } from "../_lib/getSearchSelections";
import { AssignNewQueryParams } from "@/helpers/paramsManagment";

import { FilterSelection } from "./_components/filterSelection";

import styles from "./categoryBar.module.scss";

const Categories: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const { isSearchTriggered } = useIsSearchTriggeredData();
  const { setIsSearchTriggered } = useIsSearchTriggeredApi();

  const [requestListingSearch] = useRequestListingSearchMutation();
  const {
    data: categories,
    isLoading,
    isFetching,
  } = useGetListingsCategoriesQuery();

  const selectedCategory = JSON.parse(
    params.get(SEARCH_PARAM_KEYS.SEARCH_CATEGORY_ID) as string
  );

  const requestSearchBySelectedCategory = useCallback(
    async (id: number) => {
      try {
        const searchSelection = getSearchSelection(params, SEARCH_PARAM_KEYS);

        if (id) {
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

          if (error || !res.length) ErrorHandler(error as Error);

          AssignNewQueryParams({
            updatedParams: {
              [SEARCH_PARAM_KEYS.SEARCH_CATEGORY_ID]: JSON.stringify(id),
            },
            params,
            router,
            pathname,
          });

          setIsSearchTriggered(false);
        }
      } catch (error) {
        toast(
          `🫣 We couldn't find any listings for this specific category in your area. `,
          {
            action: {
              label: "Close",
              onClick: () => {},
            },
          }
        );
      }
    },
    [params, requestListingSearch, router, pathname, setIsSearchTriggered]
  );

  useEffect(() => {
    if (selectedCategory && !isSearchTriggered) {
      requestSearchBySelectedCategory(selectedCategory);
    }
  }, [isSearchTriggered, requestSearchBySelectedCategory, selectedCategory]);

  return (
    <>
      {isLoading || isFetching || !categories?.length
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
              onClick={() => requestSearchBySelectedCategory(category.id)}
              data-selected={
                selectedCategory === category.id && !isSearchTriggered
              }
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
  const { isSearchTriggered } = useIsSearchTriggeredData();

  return (
    <>
      <motion.div
        className={styles.category_container}
        data-scrolled={scrolled}
      >
        <ScrollShadow
          hideScrollBar
          orientation="horizontal"
          className={styles.category_wrap}
        >
          {isSearchTriggered && (
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
        <FilterSelection />
      </motion.div>
    </>
  );
};
