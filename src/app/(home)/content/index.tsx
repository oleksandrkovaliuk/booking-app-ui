"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { skeletonData } from "@/information/data";

import { useGetVerifiedListingsQuery } from "@/store/api/endpoints/listings/getVerifiedListings";

import { ListingCard } from "@/components/listingCard";
import { SkeletonListingCard } from "@/components/listingCard/components/skeleton";

import styles from "./homeContent.module.scss";

export const HomeContent: React.FC = () => {
  const {
    isFetching,
    isLoading,
    isUninitialized,
    data: listings,
  } = useGetVerifiedListingsQuery();

  return (
    <div className={styles.home_container}>
      <div className={styles.listings_container}>
        {isUninitialized || isFetching || isLoading || !listings?.length
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
                  id={listing.id!}
                  images={listing.images}
                  title={listing.title}
                  price={listing.price}
                  address={listing.address}
                  guests={listing.guests}
                  pets_allowed={listing.pets_allowed}
                  accesable={listing.accesable}
                  aboutplace={listing.description}
                  isManagable={false}
                  isPublic
                />
              </motion.div>
            ))}
      </div>
    </div>
  );
};
