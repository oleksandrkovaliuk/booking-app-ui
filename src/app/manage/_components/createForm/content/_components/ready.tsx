import React from "react";
import { motion } from "framer-motion";

import {
  appearAnimation,
  deepAppearAnimation,
  sloverTransition,
} from "../../../consts";
import { ContentProps } from "../type";
import { ListingCard } from "@/components/listingCard";

export const Ready: React.FC<ContentProps> = ({ styles, images }) => {
  return (
    <motion.div className={styles.submit}>
      <motion.h1
        className={styles.title}
        {...appearAnimation}
        transition={sloverTransition}
      >
        Your listing is ready. Make sure everything ok before you publish.
      </motion.h1>
      <motion.div
        className={styles.preview_of_listing}
        {...deepAppearAnimation}
        transition={sloverTransition}
      >
        <ListingCard images={images} />
      </motion.div>
    </motion.div>
  );
};
