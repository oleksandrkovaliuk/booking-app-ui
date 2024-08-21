import React from "react";
import { Skeleton } from "@nextui-org/react";

import styles from "./skeleton.module.scss";

interface Skeleton {
  item: number;
  size: "sm" | "lg";
}

export const SkeletonListingCard: React.FC<Skeleton> = ({ item, size }) => {
  return (
    <div className={styles.skeleton_card} key={item} data-size={size}>
      <Skeleton className={styles.skeleton_img} />
      <Skeleton className={styles.skeleton_title} />
      <Skeleton className={styles.skeleton_description} />
    </div>
  );
};
