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
  handleUpdateFormAndLocalStorage,
}) => {
  return (
    <motion.div
      className={styles.additional_details}
      {...appearAnimation}
      transition={motion_transition}
    >
      <motion.h1
        className={styles.title}
        {...appearAnimation}
        transition={sloverTransition}
      >
        Now it is finnally time to describe your place in more details.
      </motion.h1>
      <motion.p
        className={styles.description}
        {...deepAppearAnimation}
        transition={sloverTransition}
      >
        Turn on you insparation and give your place a more detailed description
        💡
      </motion.p>

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
          Catchy Title
        </motion.h2>
        <Input
          variant="bordered"
          className="additional_details"
          placeholder="..."
          description="Provide a clear and catchy title for your listing. This will be the first thing potential customers see, so make it engaging and descriptive."
          onValueChange={(value) =>
            handleUpdateFormAndLocalStorage("title", value)
          }
          {...register("title")}
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
          Highlight Features
        </motion.h2>
        <Textarea
          variant="bordered"
          className="additional_details"
          placeholder="..."
          description="Describe the key features and unique aspects of your listing. Highlight what makes it special and why guests would love to stay here."
          onValueChange={(value) =>
            handleUpdateFormAndLocalStorage("aboutplace", value)
          }
          {...register("aboutplace")}
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
          Location Overview
        </motion.h2>
        <Textarea
          variant="bordered"
          className="additional_details"
          placeholder="..."
          description="Provide a brief overview of the location and setting of your listing. Mention key attributes that make it appealing."
          onValueChange={(value) =>
            handleUpdateFormAndLocalStorage("placeis", value)
          }
          {...register("placeis")}
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
          Important Notes
        </motion.h2>
        <Textarea
          variant="bordered"
          className="additional_details"
          placeholder="..."
          description="Mention any additional details or important information guests should know about your listing. This can include house rules, special instructions, or unique features."
          onValueChange={(value) =>
            handleUpdateFormAndLocalStorage("notes", value)
          }
          {...register("notes")}
        />
      </motion.div>
    </motion.div>
  );
};
