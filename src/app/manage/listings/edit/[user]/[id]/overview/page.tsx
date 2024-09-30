import React from "react";

import { ParamsProps } from "../type";

import { ListingPageComponent } from "@/components/listingPageComponent";
import styles from "./overview.module.scss";

export default function EditListing({ params }: { params: ParamsProps }) {
  return (
    <div className={styles.overview_container}>
      <ListingPageComponent id={params.id} />
    </div>
  );
}
