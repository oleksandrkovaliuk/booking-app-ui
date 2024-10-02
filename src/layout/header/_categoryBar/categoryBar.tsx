import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ScrollShadow, Skeleton, Tooltip } from "@nextui-org/react";

import { useSelector } from "@/store";
import {
  clearSearchSelection,
  setSearchSelection,
} from "@/store/slices/search/searchSelectionSlice";
import {
  setFetch,
  setIsSearchTriggered,
} from "@/store/slices/listings/isSearchTriggeredSlice";

import { useGetListingsCategoriesQuery } from "@/store/api/endpoints/listings/getCategories";

import { CloseIcon } from "@/svgs/CloseIcon";
import your_search from "@/assets/loan.png";
import { skeletonData } from "@/information/data";

import { FilterSelection } from "./_components/filterSelection";
import { CreateNewQueryParams } from "@/helpers/paramsManagment";

import { searchParamsKeys } from "../_lib/enums";

import styles from "./categoryBar.module.scss";

const Categories: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const params = useSearchParams();

  const [initParams, setInitParams] = useState<{
    [key: string]: string | null;
  }>(Object.fromEntries(params.entries()));

  const {
    data: categories,
    refetch,
    isFetching,
    isLoading,
    isUninitialized,
  } = useGetListingsCategoriesQuery({
    options: initParams,
  });

  const { isSearchTriggered, isFetched } = useSelector(
    (state) => state.isSearchTriggered
  );

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const requestSearchBySelectedCategory = async (id: number) => {
    try {
      if (id === selectedCategory) return;

      dispatch(setFetch(true));
      dispatch(setIsSearchTriggered(false));

      dispatch(
        setSearchSelection({
          [searchParamsKeys.SEARCH_CATEGORY_ID]: JSON.stringify(id),
        })
      );

      const updatedParams = CreateNewQueryParams({
        updatedParams: {
          [searchParamsKeys.SEARCH_CATEGORY_ID]: JSON.stringify(id),
        },
        params,
      });

      router.replace(`${pathname}?${updatedParams}`, {
        scroll: false,
      });

      setSelectedCategory(id);
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

  const handleClearSearchSelection = () => {
    router.push("/");
    dispatch(setFetch(true));
    dispatch(clearSearchSelection());
    dispatch(setIsSearchTriggered(false));
  };

  useEffect(() => {
    if (!params.get(searchParamsKeys.SEARCH_CATEGORY_ID)) {
      setSelectedCategory(null);
      if (isFetched && !isSearchTriggered) {
        setInitParams(Object.fromEntries(params.entries()));
        refetch();
      }
    } else {
      setSelectedCategory(
        params.get(searchParamsKeys.SEARCH_CATEGORY_ID)
          ? Number(params.get(searchParamsKeys.SEARCH_CATEGORY_ID))
          : null
      );
      dispatch(
        setSearchSelection({
          [searchParamsKeys.SEARCH_CATEGORY_ID]: params.get(
            searchParamsKeys.SEARCH_CATEGORY_ID
          ),
        })
      );
    }
  }, [dispatch, isFetched, isSearchTriggered, params, refetch]);

  return (
    <ScrollShadow
      hideScrollBar
      orientation="horizontal"
      className={styles.category_wrap}
    >
      {isFetching || isLoading || isUninitialized || !categories?.length ? (
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
              <Tooltip
                showArrow
                placement="top"
                content={"Clear search"}
                color="default"
                size="sm"
                delay={200}
                classNames={{
                  content: ["text-#2f2f2f font-medium rounded-md py-0.5 px-1 "],
                }}
              >
                <button
                  className={styles.clear_search_selection}
                  onClick={handleClearSearchSelection}
                >
                  <CloseIcon />
                </button>
              </Tooltip>
            </div>
          )}
          {categories?.map((category) => (
            <button
              key={category.id}
              className={styles.category}
              onClick={() => requestSearchBySelectedCategory(category.id)}
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
