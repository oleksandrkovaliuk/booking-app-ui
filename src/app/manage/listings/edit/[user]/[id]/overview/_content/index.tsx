"use client";
import React from "react";

import { useSelector } from "@/store";

import { ContentProps } from "../../type";

import { getCurrentListing } from "@/store/selector/getCurrentListing";
import { skeletonData } from "@/information/data";

import { SkeletonListingCard } from "@/components/listingCard/components/skeleton";
import { ListingCard } from "@/components/listingCard";

export const OverviewContent: React.FC<ContentProps> = ({ params }) => {
  const { isLoading } = useSelector((state) => state.listingsInfo);
  const listing = useSelector((state) => getCurrentListing(state, params.id));
  return (
    <>
      {isLoading && !listing ? (
        <SkeletonListingCard item={skeletonData[0]} size="lg" />
      ) : (
        <ListingCard
          isPreview
          isManagable={false}
          id={listing.id!}
          type={listing.type}
          price={listing.price}
          title={listing.title}
          images={listing.images}
          guests={listing.guests}
          address={listing.address}
          accesable={listing.accesable}
          aboutplace={listing.aboutplace}
          isComplete={listing.iscomplete}
          pets_allowed={listing.pets_allowed}
        />
      )}
    </>
  );
};
