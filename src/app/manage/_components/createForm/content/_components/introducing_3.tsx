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

export const Introducing_3: React.FC<ContentProps> = ({
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
          Finish and publish.
        </motion.h1>
        <motion.p
          className={styles.description}
          initial={deepAppearAnimation.initial}
          animate={deepAppearAnimation.animate}
          transition={sloverTransition}
        >
          In this step, you will finalize your pricing details, and then publish
          your listing. This will make your place available for guests to book.
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
        <source src={videos.apartament_building3} type="video/mp4" />
      </motion.video>
    </motion.div>
  );
};
