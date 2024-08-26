import React from "react";
import { NavigationBar } from "../../_components/navigationBar";

import { ParamsProps } from "./type";

import styles from "./layout.module.scss";

export default function EditListingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: ParamsProps;
}) {
  return (
    <div className={styles.manage_layout}>
      <NavigationBar params={params}>{children}</NavigationBar>
    </div>
  );
}
