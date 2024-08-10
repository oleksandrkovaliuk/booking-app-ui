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

export const Category: React.FC<ContentProps> = ({
  styles,
  categories,
  register,
  selectedCategory,
  handleUpdateFormAndLocalStorage,
}) => {
  return (
    <motion.div
      className={styles.category_selections}
      initial={appearAnimation.initial}
      animate={appearAnimation.animate}
      transition={motion_transition}
    >
      <motion.h1
        className={`${styles.title} ${styles.title_selections}`}
        initial={appearAnimation.initial}
        animate={appearAnimation.animate}
        transition={sloverTransition}
      >
        Which of these best describes your place?
      </motion.h1>

      <div className={styles.selections_container}>
        {categories?.map((category, i) => {
          return (
            <motion.div
              key={category.id}
              className={`${styles.category}  ${styles.selection}`}
              initial={deepAppearAnimation.initial}
              animate={deepAppearAnimation.animate}
              transition={{ delay: 0.05 * i, ease: "easeInOut" }}
              data-selected={
                selectedCategory && selectedCategory?.id === category?.id
              }
            >
              <input
                type="checkbox"
                id={`category${category.id}`}
                className={styles.hidden_checkbox}
                {...(register("category"),
                {
                  onChange: () => {
                    handleUpdateFormAndLocalStorage("category", category);
                  },
                })}
              />
              <label
                htmlFor={`category${category.id}`}
                className={`${styles.selection_block}`}
              >
                <Image
                  src={category.category_icon!}
                  alt={category.category_icon!}
                  width={30}
                  height={30}
                  className={styles.category_img}
                />
                <motion.span className={styles.category_name}>
                  {category.category_name}
                </motion.span>
              </label>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
