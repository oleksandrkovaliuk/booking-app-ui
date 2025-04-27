import React from "react";
import { motion } from "framer-motion";
import { Input, Textarea } from "@nextui-org/react";

import {
  appearAnimation,
  deepAppearAnimation,
  motion_transition,
  sloverTransition,
} from "../../../consts";
import { ContentProps } from "../type";

export const AdditionalDetails: React.FC<ContentProps> = ({
  styles,
  register,
  setValue,
  editPage,
  onConfirmation,
  handleUpdateFormAndLocalStorage,
}) => {
  return (
    <motion.div
      className={styles.additional_details}
      {...appearAnimation}
      transition={motion_transition}
    >
      {!editPage && (
        <>
          <motion.h1
            className={styles.title}
            {...appearAnimation}
            transition={sloverTransition}
          >
            {/* Now it is finnally time to describe your place in more details. */}
            Давайте детальніше опишемо ваше місце
          </motion.h1>
          <motion.p
            className={styles.description}
            {...deepAppearAnimation}
            transition={sloverTransition}
          >
            {/* Turn on you insparation and give your place a more detailed
            description 💡 */}
            Включіть своє уяву і додаєте більше деталей до вашого місця 💡
          </motion.p>
        </>
      )}

      <motion.div
        className={styles.fields}
        {...deepAppearAnimation}
        transition={{ delay: 0.15 * 0, ease: "easeInOut" }}
      >
        <motion.h2
          className={styles.fields_title}
          {...appearAnimation}
          transition={sloverTransition}
        >
          {/* Catchy Title */}
          Заголовок
        </motion.h2>
        <Input
          variant="bordered"
          className="additional_details"
          placeholder="..."
          description="Provide a clear and catchy title for your listing.
          This will be the first thing potential customers see, so make it engaging and descriptive."
          validate={(value) => {
            if (value === "") return;
            if (value?.length > 10 && value?.length < 33) {
              return true;
            }
            if (value?.length >= 33) {
              editPage && onConfirmation!(false);
              return "Please enter less than 33 characters";
            }
            if (value?.length <= 10) {
              editPage && onConfirmation!(false);
              return "Please enter at least 10 characters";
            }
          }}
          {...register(editPage ? "edit_title" : "title", {
            onChange: (event) => {
              editPage && onConfirmation!(true);
              handleUpdateFormAndLocalStorage(
                editPage ? "edit_title" : "title",
                event.target.value,
                setValue
              );
            },
          })}
        />
      </motion.div>
      <motion.div
        className={styles.fields}
        {...deepAppearAnimation}
        transition={{ delay: 0.15 * 1, ease: "easeInOut" }}
      >
        <motion.h2
          className={`${styles.fields_title} ${styles.additional}`}
          {...appearAnimation}
          transition={sloverTransition}
        >
          {/* Highlight Features */}
          Особливості місця
        </motion.h2>
        <Textarea
          variant="bordered"
          className="additional_details"
          placeholder="..."
          description="Describe the key features and unique aspects of your listing. Highlight what makes it special and why guests would love to stay here."
          validate={(value) => {
            if (value !== "") {
              if (value?.length > 10) {
                return true;
              } else {
                editPage && onConfirmation!(false);
                return "Please enter at least 10 characters";
              }
            } else {
              return true;
            }
          }}
          {...register(editPage ? "edit_aboutplace" : "aboutplace", {
            onChange: (event) => {
              editPage && onConfirmation!(true);
              handleUpdateFormAndLocalStorage(
                editPage ? "edit_aboutplace" : "aboutplace",
                event.target.value,
                setValue
              );
            },
          })}
        />
      </motion.div>
      <motion.div
        className={styles.fields}
        {...deepAppearAnimation}
        transition={{ delay: 0.15 * 2, ease: "easeInOut" }}
      >
        <motion.h2
          className={`${styles.fields_title} ${styles.additional}`}
          {...appearAnimation}
          transition={sloverTransition}
        >
          {/* Location Overview */}
          Опис місця
        </motion.h2>
        <Textarea
          variant="bordered"
          className="additional_details"
          placeholder="..."
          description="Provide a brief overview of the location and setting of your listing. Mention key attributes that make it appealing."
          validate={(value) => {
            if (value !== "") {
              if (value?.length > 10) {
                return true;
              } else {
                editPage && onConfirmation!(false);
                return "Please enter at least 10 characters";
              }
            } else {
              return true;
            }
          }}
          {...register(editPage ? "edit_placeis" : "placeis", {
            onChange: (event) => {
              editPage && onConfirmation!(true);
              handleUpdateFormAndLocalStorage(
                editPage ? "edit_placeis" : "placeis",
                event.target.value,
                setValue
              );
            },
          })}
        />
      </motion.div>
      <motion.div
        className={styles.fields}
        {...deepAppearAnimation}
        transition={{ delay: 0.15 * 3, ease: "easeInOut" }}
      >
        <motion.h2
          className={`${styles.fields_title} ${styles.additional}`}
          {...appearAnimation}
          transition={sloverTransition}
        >
          {/* Important Notes */}
          Важливі нотатки
        </motion.h2>
        <Textarea
          variant="bordered"
          className="additional_details"
          placeholder="..."
          description="Mention any additional details or important information guests should know about your listing. This can include house rules, special instructions, or unique features."
          validate={(value) => {
            if (value !== "") {
              if (value?.length > 10) {
                return true;
              } else {
                editPage && onConfirmation!(false);
                return "Please enter at least 10 characters";
              }
            } else {
              return true;
            }
          }}
          {...register(editPage ? "edit_notes" : "notes", {
            onChange: (event) => {
              editPage && onConfirmation!(true);
              handleUpdateFormAndLocalStorage(
                editPage ? "edit_notes" : "notes",
                event.target.value,
                setValue
              );
            },
          })}
        />
      </motion.div>
    </motion.div>
  );
};
