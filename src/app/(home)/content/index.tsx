"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";

import { useSelector } from "@/store";
import { setFetch } from "@/store/slices/listings/isSearchTriggeredSlice";
import { setListings } from "@/store/slices/listings/listingSearchResponseSlice";
import { clearSearchSelection } from "@/store/slices/search/searchSelectionSlice";

import { useGetVerifiedListingByParamsQuery } from "@/store/api/endpoints/listings/getVerifiedListings";

import { ListingCard } from "@/components/listingCard";
import { SkeletonListingCard } from "@/components/listingCard/components/skeleton";

import { skeletonData } from "@/information/data";

import styles from "./homeContent.module.scss";

export const HomeContent: React.FC = () => {
  const dispatch = useDispatch();
  const params = useSearchParams();

  const { isFetched } = useSelector((state) => state.isSearchTriggered);

  const [initParams, setInitParams] = useState<{
    [key: string]: string | null;
  }>(Object.fromEntries(params.entries()));

  const {
    data: listings,
    refetch,
    isLoading,
    isFetching,
    isUninitialized,
  } = useGetVerifiedListingByParamsQuery({
    options: initParams,
  });

  useEffect(() => {
    if (isFetched) {
      setInitParams(Object.fromEntries(params.entries()));
      refetch();
    }
  }, [dispatch, isFetched, params, refetch]);

  useEffect(() => {
    dispatch(setListings(listings));
  }, [listings, dispatch]);

  return (
    <div className={styles.home_container}>
      {!isLoading && !isFetching && !isUninitialized && !listings?.length && (
        <div className={styles.no_listings_found}>
          <span className={styles.no_listings_found_text}>
            Unfortunately no listings were found.{" "}
          </span>
          <Link
            href={"/"}
            onClick={() => {
              if (params.size > 0) {
                dispatch(clearSearchSelection());
                dispatch(setFetch(true));
              }
            }}
            className={styles.discarb_button}
          >
            Discarb your search selection
          </Link>
        </div>
      )}
      <div className={styles.listings_container}>
        {isLoading || isFetching || isUninitialized
          ? skeletonData.map((item) => (
              <SkeletonListingCard key={item} item={item} size="sm" />
            ))
          : listings?.map((listing, i) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0 }}
                animate={listings.length ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.1 * i, ease: "linear" }}
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
                  aboutplace={listing.description}
                  pets_allowed={listing.pets_allowed}
                />
              </motion.div>
            ))}
      </div>
    </div>
  );
};
