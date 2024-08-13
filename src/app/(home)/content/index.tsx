"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import { RootState } from "@/store";
import { ListingCard } from "@/components/listingCard";
import { appearAnimation } from "@/app/manage/_components/consts";

import styles from "./homeContent.module.scss";

export const HomeContent: React.FC = () => {
  const { listings } = useSelector((state: RootState) => state.listingsInfo);
  return (
    <div className={styles.home_container}>
      <div className={styles.listings_container}>
        {listings?.map((listing, i) => (
          <motion.div
            key={listing.id}
            {...appearAnimation}
            transition={{ delay: 0.1 * i, ease: "easeInOut" }}
          >
            <ListingCard
              images={listing.images}
              title={listing.title}
              price={listing.price}
              location={listing.address}
              guests={listing.guests}
              allowPets={listing.allowPets}
              accessible={listing.accessible}
              description={listing.description}
              isPublic
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
