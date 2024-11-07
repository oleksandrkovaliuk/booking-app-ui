import React from "react";

import { IParamsProps } from "../type";

import { ListingPageComponent } from "@/components/listingPageComponent";
import styles from "./overview.module.scss";
import { store } from "@/store";
import { getCurrentListing } from "@/store/api/endpoints/listings/getCurrentListing";
import { getUser } from "@/store/api/endpoints/auth/getUser";

export default async function EditListing({
  params,
}: {
  params: IParamsProps;
}) {
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
    <div className={styles.overview_container}>
      <ListingPageComponent listing={listing!} listingHost={listingHost!} />
    </div>
  );
}
