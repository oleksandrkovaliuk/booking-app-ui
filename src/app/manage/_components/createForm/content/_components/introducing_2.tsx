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

export const Introducing_2: React.FC<ContentProps> = ({
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
          {/* Make your place stand out */}
          Розкажіть про своє місце
        </motion.h1>
        <motion.p
          className={styles.description}
          initial={deepAppearAnimation.initial}
          animate={deepAppearAnimation.animate}
          transition={sloverTransition}
        >
          {/* In this step, you’ll add some of the amenities your place offers, plus
          5 or more images. Then, you’ll create a title and description. */}
          У цьому крокі, ви додасте 5 або більше
          зображень. Потім ви створите заголовок і опис.
        </motion.p>
      </motion.div>
      <motion.video
        autoPlay
        muted
        playsInline
        className={styles.video}
        initial={deepAppearAnimation.initial}
        animate={deepAppearAnimation.animate}
        transition={motion_transition}
        preload="auto"
      >
        <source src={videos.apartament_building2} type="video/mp4" />
      </motion.video>
    </motion.div>
  );
};
