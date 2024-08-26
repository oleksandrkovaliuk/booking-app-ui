import React, { Suspense } from "react";

import { OverviewContent } from "./_content";
import { ParamsProps } from "../type";

import styles from "./overview.module.scss";

export default function EditListing({ params }: { params: ParamsProps }) {
  return (
    <div className={styles.manage_layout}>
      <OverviewContent params={params} />
    </div>
  );
}
