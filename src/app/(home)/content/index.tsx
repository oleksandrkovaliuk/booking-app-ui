"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";

import { useSelector } from "@/store";
import { setListings } from "@/store/slices/listings/listingSearchResponseSlice";

import { useGetVerifiedListingByParamsQuery } from "@/store/api/endpoints/listings/getVerifiedListings";

import { ListingCard } from "@/components/listingCard";
import { SkeletonListingCard } from "@/components/listingCard/components/skeleton";

import { ExtractAvailableQueryParams } from "@/helpers/paramsManagment";

import { skeletonData } from "@/information/data";

import styles from "./homeContent.module.scss";
import { setIsSearchTriggered } from "@/store/slices/listings/isSearchTriggeredSlice";
import { SEARCH_PARAM_KEYS } from "@/layout/header/_lib/enums";

export const HomeContent: React.FC = () => {
  const dispatch = useDispatch();
  const params = useSearchParams();

  const { isFetched } = useSelector((state) => state.isSearchTriggered);

  const [initParams, setInitParams] = useState<{
    [key: string]: string | null;
  }>(ExtractAvailableQueryParams(params));

  const { data: listings, refetch } = useGetVerifiedListingByParamsQuery({
    options: initParams,
  });

  // CONDITIONS

  useEffect(() => {
    const isSearchSelectionClear =
      !params.get(SEARCH_PARAM_KEYS.SEARCH_PLACE) &&
      !params.get(SEARCH_PARAM_KEYS.SEARCH_DATE) &&
      !params.get(SEARCH_PARAM_KEYS.SEARCH_AMOUNT_OF_GUESTS);

    if (isFetched) {
      setInitParams(ExtractAvailableQueryParams(params));
      refetch();
      if (isSearchSelectionClear) {
        dispatch(setIsSearchTriggered(false));
      }
    }
  }, [dispatch, isFetched, params, refetch]);

  useEffect(() => {
    dispatch(setListings(listings));
  }, [dispatch, listings]);

  return (
    <div className={styles.home_container}>
      <div className={styles.listings_container}>
        {!listings
          ? skeletonData.map((item) => (
              <SkeletonListingCard key={item} item={item} size="sm" />
            ))
          : listings?.map((listing, i) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 * i, ease: "easeInOut" }}
              >
                <ListingCard
                  isPublic
                  id={listing.id!}
                  isManagable={false}
                  title={listing.title}
                  price={listing.price}
                  guests={listing.guests}
                  images={listing.images}
                  address={listing.address}
                  accesable={listing.accesable}
                  // calculated_nights={countNights}
                  aboutplace={listing.description}
                  pets_allowed={listing.pets_allowed}
                />
              </motion.div>
            ))}
      </div>
    </div>
  );
};
