import React from "react";
import { motion } from "framer-motion";

import {
  appearAnimation,
  deepAppearAnimation,
  sloverTransition,
} from "../../../consts";
import { ContentProps } from "../type";
import { ListingCard } from "@/components/listingCard";
import { CalendarIcon } from "@/svgs/CalendarIcon";
import { EditIcon } from "@/svgs/EditIcon";

export const Ready: React.FC<ContentProps> = ({
  styles,
  images,
  selectedTitle,
  selectedAdress,
  selectedPrice,
  selectedGuests,
  selectedAboutPlace,
  selectedTypeOfPlace,
  selectedAdditionalDetails,
}) => {
  return (
    <motion.div className={styles.submit}>
      <motion.h1
        className={styles.title}
        {...appearAnimation}
        transition={sloverTransition}
      >
        {/* Review your listing */}
        Перевірте своє оголошеня
      </motion.h1>
      <motion.p
        className={styles.description}
        {...appearAnimation}
        transition={sloverTransition}
      >
        {/* {`Here's what we'll show to guests. Make sure everything looks good.`} */}
        Запевніться, що усе відображається правильно.
      </motion.p>
      <div className={styles.preview_of_listing_container}>
        <motion.div
          className={styles.preview_of_listing}
          {...deepAppearAnimation}
          transition={sloverTransition}
        >
          <ListingCard
            isPreview
            isManagable={false}
            images={images!}
            title={selectedTitle!}
            price={selectedPrice!}
            address={selectedAdress}
            aboutplace={selectedAboutPlace}
            guests={selectedGuests}
            pets_allowed={selectedAdditionalDetails?.pets!}
            accesable={selectedAdditionalDetails?.accesable!}
            type={selectedTypeOfPlace}
            isComplete={false}
          />
        </motion.div>
        <motion.div
          className={styles.info_blocks_container}
          {...deepAppearAnimation}
          transition={sloverTransition}
        >
          <motion.h2 className={styles.title}>Next steps</motion.h2>
          <motion.div
            className={styles.steps}
            {...appearAnimation}
            transition={{ delay: 0.1 + 0.2, ease: "easeInOut" }}
          >
            <CalendarIcon className={styles.steps_icon} />
            <div className={styles.steps_text_content}>
              <h3 className={styles.steps_title}>Set up your calendar</h3>
              <p className={styles.steps_description}>
                Choose which dates your listing is available. It will be visible
                24 hours after you publish.
              </p>
            </div>
          </motion.div>
          <motion.div
            className={styles.steps}
            {...appearAnimation}
            transition={{ delay: 0.1 + 0.3, ease: "easeInOut" }}
          >
            <EditIcon className={styles.steps_icon} />
            <div className={styles.steps_text_content}>
              <h4 className={styles.steps_title}>Adjust your settings</h4>
              <p className={styles.steps_description}>
                Set house rules, select a cancellation policy, choose how guests
                book, and more.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
