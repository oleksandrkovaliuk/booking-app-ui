import React from "react";

import { IParamsProps } from "../type";

import { ListingPageComponent } from "@/components/listingPageComponent";
import styles from "./overview.module.scss";

export default function EditListing({ params }: { params: IParamsProps }) {
  return (
    <div className={styles.overview_container}>
      <ListingPageComponent id={params.id} />
    </div>
  );
}
