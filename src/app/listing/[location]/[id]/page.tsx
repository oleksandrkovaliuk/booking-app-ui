import React from "react";
import { ListingPageComponent } from "@/components/listingPageComponent";
import { store } from "@/store";
import { getCurrentListing } from "@/store/api/endpoints/listings/getCurrentListing";
import { getUser } from "@/store/api/endpoints/auth/getUser";

export default async function Page({
  params,
}: Readonly<{ params: { location: string; id: string } }>) {
  const { data: listing } = await store.dispatch(
    getCurrentListing.initiate({
      id: Number(params.id),
    })
  );

  const listingHost = await store
    .dispatch(
      getUser.initiate({
        user_email: listing?.host_email!,
      })
    )
    .unwrap();
  return (
    <ListingPageComponent
      isPublic
      listing={listing!}
      listingHost={listingHost}
    />
  );
}
