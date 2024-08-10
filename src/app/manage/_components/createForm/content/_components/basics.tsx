import React from "react";
import { motion } from "framer-motion";
import { Switch } from "@nextui-org/react";

import { ContentProps } from "../type";
import {
  appearAnimation,
  deepAppearAnimation,
  sloverTransition,
  motion_transition,
} from "../../../consts";
import { Counter } from "@/components/counter";

export const Basics: React.FC<ContentProps> = ({
  styles,
  register,
  selectedGuests,
  selectedAdditionalDetails,
  handleUpdateFormAndLocalStorage,
}) => {
  return (
    <motion.div
      className={styles.basics}
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
        Share with us some basics about your place.
      </motion.h1>
      <motion.div
        className={styles.basic_selections}
        initial={deepAppearAnimation.initial}
        animate={deepAppearAnimation.animate}
        transition={sloverTransition}
      >
        <span className={styles.basic_selections_title}>
          How many guests will have their own private space?
        </span>
        <Counter
          counter={Number(selectedGuests) || 1}
          {...(register("guests"),
          {
            setCounter: (value) => {
              handleUpdateFormAndLocalStorage("guests", value);
            },
          })}
        />
      </motion.div>
      <motion.div
        className={styles.basic_selections}
        initial={deepAppearAnimation.initial}
        animate={deepAppearAnimation.animate}
        transition={sloverTransition}
      >
        <span className={styles.basic_selections_title}>
          Is your place pet-friendly?
        </span>
        <Switch
          aria-label={`pets-friedly-switch`}
          {...(register("additionalDetails"),
          {
            onValueChange: (e) => {
              handleUpdateFormAndLocalStorage("additionalDetails", {
                pets: !selectedAdditionalDetails?.pets,
                accesable: selectedAdditionalDetails?.accesable!,
              });
            },
          })}
          isSelected={selectedAdditionalDetails?.pets}
        />
      </motion.div>
      <motion.div
        className={styles.basic_selections}
        initial={deepAppearAnimation.initial}
        animate={deepAppearAnimation.animate}
        transition={sloverTransition}
      >
        <span className={styles.basic_selections_title}>
          Is your place wheelchair accessible?
        </span>
        <Switch
          aria-label={`pets-friedly-switch`}
          {...(register("additionalDetails"),
          {
            onValueChange: (e) => {
              handleUpdateFormAndLocalStorage("additionalDetails", {
                pets: selectedAdditionalDetails?.pets!,
                accesable: !selectedAdditionalDetails?.accesable,
              });
            },
          })}
          isSelected={selectedAdditionalDetails?.accesable}
        />
      </motion.div>
    </motion.div>
  );
};
