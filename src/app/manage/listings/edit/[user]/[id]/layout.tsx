import React from "react";
import { NavigationBar } from "../../_components/navigationBar";

import { IParamsProps } from "./type";

import styles from "./layout.module.scss";

export default function EditListingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: IParamsProps;
}) {
  return (
    <div className={styles.manage_layout}>
      <NavigationBar params={params}>{children}</NavigationBar>
    </div>
  );
}
