"use client";
import React from "react";

import { useSelector } from "@/store";
import { EditingFormProps } from "./type";
import { ListingState } from "@/app/api/apiCalls";
import { SkeletonListingCard } from "@/components/listingCard/components/skeleton";
import { skeletonData } from "@/information/data";
import { ListingCard } from "@/components/listingCard";

export const EditingForm: React.FC<EditingFormProps> = ({ params }) => {
  const { listings, isLoading } = useSelector((state) => state.listingsInfo);
  const listing: ListingState = listings.filter(
    (listing) => listing.id === Number(params.id)
  )[0];
  console.log(listing?.aboutplace);

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
