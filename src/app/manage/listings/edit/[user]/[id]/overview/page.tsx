import React, { Suspense } from "react";

import { EditingForm } from "../../../_components/editingForm";
import { ParamsProps } from "../type";

import styles from "./overview.module.scss";

export default function EditListing({ params }: { params: ParamsProps }) {
  return (
    <div className={styles.manage_layout}>
      <EditingForm params={params} />
    </div>
  );
}
