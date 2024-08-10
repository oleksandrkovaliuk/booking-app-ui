import React from "react";
import { motion } from "framer-motion";

import {
  appearAnimation,
  sloverTransition,
  motion_transition,
} from "../../../consts";
import { ContentProps } from "../type";
import { GoogleMap } from "../../../googleMap/googleMap";

export const Location: React.FC<ContentProps> = ({
  styles,
  register,
  selectedCordinates,
  handleCordinatesChange,
}) => {
  return (
    <motion.div
      className={styles.location}
      initial={appearAnimation.initial}
      animate={appearAnimation.animate}
      transition={motion_transition}
    >
      <motion.h1
        className={styles.title}
        initial={appearAnimation.initial}
        animate={appearAnimation.animate}
        transition={sloverTransition}
      >
        Where is your place located?
      </motion.h1>

      <GoogleMap
        register={register}
        cordinates={selectedCordinates!}
        setCordinates={handleCordinatesChange}
      />
      <motion.p className={styles.description}>
        Please ensure the pin is accurately placed on your address. If not, you
        can always drag it to the correct location.
      </motion.p>
    </motion.div>
  );
};
