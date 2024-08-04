import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { ContentProps } from "../type";
import {
  appearAnimation,
  deepAppearAnimation,
  sloverTransition,
  transition,
} from "@/app/manage/_components/consts";

export const TypeOfPlace: React.FC<ContentProps> = ({
  styles,
  typeOfPlace,
  register,
  selectedTypeOfPlace,
  handleUpdateFormAndLocalStorage,
}) => {
  return (
    <motion.div
      className={styles.type_of_place}
      initial={appearAnimation.initial}
      animate={appearAnimation.animate}
      transition={transition}
    >
      <motion.h1
        className={`${styles.title} ${styles.title_selections}`}
        initial={appearAnimation.initial}
        animate={appearAnimation.animate}
        transition={sloverTransition}
      >
        What type of place will guests have?
      </motion.h1>
      <div className={styles.selections_container}>
        {typeOfPlace?.map((type) => (
          <motion.div
            key={type.id}
            initial={deepAppearAnimation.initial}
            animate={deepAppearAnimation.animate}
            transition={sloverTransition}
            className={`${styles.type_button} ${styles.selection}`}
            data-selected={
              selectedTypeOfPlace && type.id === selectedTypeOfPlace.id
            }
          >
            <input
              type="checkbox"
              id={`typeOfPlace${type.id}`}
              aria-label={`typeOfPlace${type.id}`}
              className={styles.hidden_checkbox}
              {...(register("typeOfPlace"),
              {
                onChange: (e) => {
                  handleUpdateFormAndLocalStorage("typeOfPlace", type);
                },
              })}
            />

            <div className={styles.type_of_place_text}>
              <motion.span className={styles.type_name}>
                {type.type_name}
              </motion.span>
              <motion.p className={styles.type_description}>
                {type.type_description}
              </motion.p>
            </div>
            <Image
              src={type.type_img}
              alt={type.type_img}
              width={30}
              height={30}
              className={styles.type_img}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
