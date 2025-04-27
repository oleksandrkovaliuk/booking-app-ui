import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { ContentProps } from "../type";
import {
  appearAnimation,
  deepAppearAnimation,
  sloverTransition,
  motion_transition,
} from "@/app/manage/_components/consts";

export const TypeOfPlace: React.FC<ContentProps> = ({
  styles,
  register,
  setValue,
  editPage,
  typeOfPlace,
  onConfirmation,
  selectedTypeOfPlace,
  handleUpdateFormAndLocalStorage,
}) => {
  return (
    <motion.div
      className={styles.type_of_place}
      initial={appearAnimation.initial}
      animate={appearAnimation.animate}
      transition={motion_transition}
    >
      {!editPage && (
        <motion.h1
          className={`${styles.title} ${styles.title_selections}`}
          initial={appearAnimation.initial}
          animate={appearAnimation.animate}
          transition={sloverTransition}
        >
          {/* What type of place will guests have? */}
           Який тип місця ви пропонуєте
          гостям?
        </motion.h1>
      )}

      <div className={styles.selections_container}>
        {typeOfPlace?.map((type, i) => (
          <motion.div
            key={type.id}
            initial={deepAppearAnimation.initial}
            animate={deepAppearAnimation.animate}
            transition={{ delay: 0.2 * i, ease: "easeInOut" }}
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
              {...(register(editPage ? "edit_type" : "type"),
              {
                onChange: (e) => {
                  editPage && onConfirmation!(true);
                  handleUpdateFormAndLocalStorage(
                    editPage ? "edit_type" : "type",
                    type,
                    setValue
                  );
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
