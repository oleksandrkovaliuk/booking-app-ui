import React from "react";
import { motion } from "framer-motion";

import { ContentProps } from "../type";
import {
  appearAnimation,
  deepAppearAnimation,
  sloverTransition,
  motion_transition,
} from "@/app/manage/_components/consts";
import { videos } from "@/information/data";

export const Introducing: React.FC<ContentProps> = ({
  styles,
}: ContentProps) => {
  return (
    <motion.div className={styles.introducing}>
      <motion.div
        className={styles.introducing_text}
        initial={appearAnimation.initial}
        animate={appearAnimation.animate}
        transition={motion_transition}
      >
        <motion.h1
          className={styles.title}
          initial={deepAppearAnimation.initial}
          animate={deepAppearAnimation.animate}
          transition={sloverTransition}
        >
          Tell us about your place
        </motion.h1>
        <motion.p
          className={styles.description}
          initial={deepAppearAnimation.initial}
          animate={deepAppearAnimation.animate}
          transition={sloverTransition}
        >
          In this step , we will ask you which type of place are you offering
          and if guest will book entire place or just a room . Then let us now
          your location.
        </motion.p>
      </motion.div>
      <motion.video
        autoPlay
        muted
        playsInline
        className={styles.video}
        initial={deepAppearAnimation.initial}
        animate={deepAppearAnimation.animate}
        transition={sloverTransition}
        preload="auto"
      >
        <source src={videos.apartament_building} type="video/mp4" />
      </motion.video>
    </motion.div>
  );
};
