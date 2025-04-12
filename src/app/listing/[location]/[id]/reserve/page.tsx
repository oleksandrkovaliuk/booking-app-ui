import React from "react";
import { ReserveContent } from "./content/reservePage";
import { store } from "@/store";
import { getCurrentListing } from "@/store/api/endpoints/listings/getCurrentListing";
import { getUser } from "@/store/api/endpoints/auth/getUser";

export default async function ReserveListingPage({
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
    <ReserveContent
      params={params}
      listing={listing!}
      listingHost={listingHost.data!}
    />
  );
}
