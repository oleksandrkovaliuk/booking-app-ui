"use client";

import React from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@nextui-org/react";

import { useSelector } from "@/store";
import { skeletonData } from "@/information/data";

import { ListingCard } from "@/components/listingCard";
import { appearAnimation } from "@/app/manage/_components/consts";
import { SkeletonListingCard } from "@/components/listingCard/components/skeleton";

import styles from "./homeContent.module.scss";

export const HomeContent: React.FC = () => {
  const { listings, isLoading } = useSelector((state) => state.listingsInfo);
  const verifiedListings = listings.length
    ? listings?.filter((item) => item.iscomplete)
    : [];

  return (
    <div className={styles.home_container}>
      <div className={styles.listings_container}>
        {isLoading.listings || !verifiedListings.length
          ? skeletonData.map((item) => (
              <SkeletonListingCard key={item} item={item} size="sm" />
            ))
          : verifiedListings?.map((listing, i) => (
              <motion.div
                key={listing.id}
                {...appearAnimation}
                transition={{ delay: 0.1 * i, ease: "easeInOut" }}
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
