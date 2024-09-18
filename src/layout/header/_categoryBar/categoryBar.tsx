import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ScrollShadow, Skeleton } from "@nextui-org/react";

import { useSelector } from "@/store";
import {
  setFetch,
  setIsSearchTriggered,
} from "@/store/slices/listings/isSearchTriggeredSlice";
import { useRequestListingSearchMutation } from "@/store/api/endpoints/listings/getVerifiedListings";
import { useGetListingsCategoriesQuery } from "@/store/api/endpoints/listings/getCategories";

import your_search from "@/assets/loan.png";
import { skeletonData } from "@/information/data";

import { FilterSelection } from "./_components/filterSelection";
import { ParseLocalStorageDates } from "@/helpers/dateManagment";
import { ExtractAvailableQueryParams } from "@/helpers/paramsManagment";

import { SEARCH_PARAM_KEYS } from "../_lib/enums";
import { getSearchSelection } from "../_lib/getSearchSelections";

import styles from "./categoryBar.module.scss";

const Categories: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const params = useSearchParams();

  const {
    data: categories,
    isLoading,
    isFetching,
  } = useGetListingsCategoriesQuery();
  const [requestListingSearch] = useRequestListingSearchMutation();

  const { isFetched, isSearchTriggered } = useSelector(
    (state) => state.isSearchTriggered
  );

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const requestSearchBySelectedCategory = async (id: number) => {
    try {
      const searchSelection = getSearchSelection(params, SEARCH_PARAM_KEYS);

      const { data: res, error } = await requestListingSearch({
        search_place: searchSelection[SEARCH_PARAM_KEYS.SEARCH_PLACE]
          ? JSON.parse(searchSelection[SEARCH_PARAM_KEYS.SEARCH_PLACE])
          : null,
        search_date: searchSelection[SEARCH_PARAM_KEYS.SEARCH_DATE]
          ? ParseLocalStorageDates(
              searchSelection[SEARCH_PARAM_KEYS.SEARCH_DATE]
            )
          : null,
        search_amountOfGuests: searchSelection[
          SEARCH_PARAM_KEYS.SEARCH_AMOUNT_OF_GUESTS
        ]
          ? JSON.parse(
              searchSelection[SEARCH_PARAM_KEYS.SEARCH_AMOUNT_OF_GUESTS]
            )
          : null,
        search_includePets: searchSelection[
          SEARCH_PARAM_KEYS.SEARCH_INCLUDE_PETS
        ]
          ? JSON.parse(searchSelection[SEARCH_PARAM_KEYS.SEARCH_INCLUDE_PETS])
          : null,
        search_category_id: id,
        options: ExtractAvailableQueryParams(params),
      });

      if (!res || error) throw new Error();

      setSelectedCategory((prev) => {
        if (prev === id) {
          return prev;
        } else {
          return id;
        }
      });

      dispatch(setFetch(true));
      dispatch(setIsSearchTriggered(false));
    } catch (error) {
      toast(
        `🫣 We couldn't find any listings for this specific category in your area. `,
        {
          position: "top-center",
          action: {
            label: "Close",
            onClick: () => {},
          },
        }
      );
    }
  };

  useEffect(() => {
    if (isSearchTriggered) {
      setSelectedCategory(null);
    }
  }, [isFetched, isSearchTriggered]);

  return (
    <ScrollShadow
      hideScrollBar
      orientation="horizontal"
      className={styles.category_wrap}
    >
      {isLoading || isFetching || !categories?.length ? (
        skeletonData?.map((item) => (
          <div className={styles.skeleton_macket} key={item}>
            <Skeleton className={styles.skeleton}>
              <div className={styles.skeleton_img} />
            </Skeleton>
            <Skeleton className={styles.skeleton}>
              <div className={styles.skeleton_text} />
            </Skeleton>
          </div>
        ))
      ) : (
        <>
          {isSearchTriggered && !selectedCategory && (
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
          {categories?.map((category) => (
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
      )}
    </ScrollShadow>
  );
};

export const CategoryBar = ({ scrolled }: { scrolled: boolean }) => {
  return (
    <>
      <motion.div
        className={styles.category_container}
        data-scrolled={scrolled}
      >
        <Categories />
        <FilterSelection />
      </motion.div>
    </>
  );
};
