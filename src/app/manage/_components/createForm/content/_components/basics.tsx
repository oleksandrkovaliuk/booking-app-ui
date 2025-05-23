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
  editPage,
  setValue,
  onConfirmation,
  selectedGuests,
  selectedAccesable,
  selectedPetsAllowed,
  handleUpdateFormAndLocalStorage,
}) => {
  return (
    <motion.div
      className={styles.basics}
      initial={appearAnimation.initial}
      animate={appearAnimation.animate}
      transition={motion_transition}
    >
      {!editPage && (
        <motion.h1
          className={styles.title}
          initial={appearAnimation.initial}
          animate={appearAnimation.animate}
          transition={sloverTransition}
        >
          {/* Share with us some basics about your place. */}
          Поділіться з нами базовими деталями вашого місця.
        </motion.h1>
      )}
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
          {...(register(editPage ? "edit_guests" : "guests"),
          {
            setCounter: (value) => {
              editPage && onConfirmation!(true);
              handleUpdateFormAndLocalStorage(
                editPage ? "edit_guests" : "guests",
                value,
                setValue
              );
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
          {...(register(editPage ? "edit_pets_allowed" : "pets_allowed"),
          {
            onValueChange: (e) => {
              editPage && onConfirmation!(true);
              handleUpdateFormAndLocalStorage(
                editPage ? "edit_pets_allowed" : "pets_allowed",
                !selectedPetsAllowed,
                setValue
              );
            },
          })}
          isSelected={selectedPetsAllowed}
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
          {...(register(editPage ? "edit_accesable" : "accesable"),
          {
            onValueChange: (e) => {
              editPage && onConfirmation!(true);
              handleUpdateFormAndLocalStorage(
                editPage ? "edit_accesable" : "accesable",
                !selectedAccesable,
                setValue
              );
            },
          })}
          isSelected={selectedAccesable}
        />
      </motion.div>
    </motion.div>
  );
};
