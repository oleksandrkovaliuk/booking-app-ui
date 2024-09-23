import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { ScrollShadow, Skeleton } from "@nextui-org/react";

import { useSelector } from "@/store";
import {
  setFetch,
  setIsSearchTriggered,
} from "@/store/slices/listings/isSearchTriggeredSlice";
import { searchSelectionSelector } from "@/store/selectors/searchSelection";
import { useRequestListingSearchMutation } from "@/store/api/endpoints/listings/getVerifiedListings";
import {
  useGetListingsCategoriesQuery,
  useRequestAvailableCategoriesMutation,
} from "@/store/api/endpoints/listings/getCategories";

import your_search from "@/assets/loan.png";
import { skeletonData } from "@/information/data";

import { FilterSelection } from "./_components/filterSelection";
import { ParseLocalStorageDates } from "@/helpers/dateManagment";

import styles from "./categoryBar.module.scss";
import { setSearchSelection } from "@/store/slices/search/searchSelectionSlice";
import { searchParamsKeys } from "../_lib/enums";

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const params = useSearchParams();

  const {
    data: categories,
    isLoading,
    isFetching,
  } = useGetListingsCategoriesQuery();
  const [requestListingSearch] = useRequestListingSearchMutation();
  const [requestAvailableCategories] = useRequestAvailableCategoriesMutation();

  const {
    search_place,
    search_date,
    search_amountOfGuests,
    search_includePets,
  } = useSelector(searchSelectionSelector);

  const { isFetched, isSearchTriggered } = useSelector(
    (state) => state.isSearchTriggered
  );

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const requestSearchBySelectedCategory = async (id: number) => {
    try {
      if (id === selectedCategory) return;
      const { data: res, error } = await requestListingSearch({
        search_place: search_place ? JSON.parse(search_place) : null,
        search_date: search_date ? ParseLocalStorageDates(search_date) : null,
        search_amountOfGuests: search_amountOfGuests
          ? JSON.parse(search_amountOfGuests)
          : null,
        search_includePets: search_includePets
          ? JSON.parse(search_includePets)
          : null,
        search_category_id: id,
        options: Object.fromEntries(params.entries()),
      });
      if (!res || error) throw new Error();

      setSelectedCategory(id);

      dispatch(
        setSearchSelection({
          [searchParamsKeys.SEARCH_CATEGORY_ID]: JSON.stringify(id),
        })
      );
      dispatch(setFetch(false));
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

  const handleResetCategory = useCallback(async () => {
    if (params.size === 0) {
      const { data: res } = await requestListingSearch({
        search_place: null,
        search_date: null,
        search_amountOfGuests: null,
        search_includePets: null,

        options: Object.fromEntries(params.entries()),
      });

      await requestAvailableCategories(res!);

      setSelectedCategory(null);
      dispatch(
        setSearchSelection({
          [searchParamsKeys.SEARCH_CATEGORY_ID]: JSON.stringify(null),
        })
      );
    } else {
      return;
    }
  }, [dispatch, params, requestAvailableCategories, requestListingSearch]);

  useEffect(() => {
    if (isSearchTriggered) {
      setSelectedCategory(null);
      dispatch(
        setSearchSelection({
          [searchParamsKeys.SEARCH_CATEGORY_ID]: JSON.stringify(null),
        })
      );
    }
  }, [dispatch, isSearchTriggered]);

  useEffect(() => {
    handleResetCategory();
  }, [handleResetCategory]);

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
