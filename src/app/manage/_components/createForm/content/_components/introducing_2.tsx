import React from "react";
import { motion } from "framer-motion";

import { ContentProps } from "../type";
import { videos } from "@/information/data";
import {
  appearAnimation,
  deepAppearAnimation,
  sloverTransition,
  transition,
} from "@/app/manage/_components/consts";

export const Introducing_2: React.FC<ContentProps> = ({
  styles,
}: ContentProps) => {
  return (
    <motion.div className={styles.introducing}>
      <motion.div
        className={styles.introducing_text}
        initial={appearAnimation.initial}
        animate={appearAnimation.animate}
        transition={transition}
      >
        <motion.h1
          className={styles.title}
          initial={deepAppearAnimation.initial}
          animate={deepAppearAnimation.animate}
          transition={sloverTransition}
        >
          Make your place stand out
        </motion.h1>
        <motion.p
          className={styles.description}
          initial={deepAppearAnimation.initial}
          animate={deepAppearAnimation.animate}
          transition={sloverTransition}
        >
          In this step, you’ll add some of the amenities your place offers, plus
          5 or more images. Then, you’ll create a title and description.
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
        <source src={videos.apartament_building2} type="video/mp4" />
      </motion.video>
    </motion.div>
  );
};
