import React, { useEffect, useLayoutEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Tooltip } from "@nextui-org/react";

import {
  appearAnimation,
  deepAppearAnimation,
  motion_transition,
  sloverTransition,
} from "../../../consts";
import { PriceLimit } from "../enum";
import { ContentProps } from "../type";

export const Price: React.FC<ContentProps> = ({
  styles,
  editPage,
  register,
  setValue,
  selectedPrice,
  onConfirmation,
  handleUpdateFormAndLocalStorage,
}) => {
  const [inputWidth, setInputWidth] = useState<number>(
    selectedPrice!.split("").length
  );

  const [invalidPrice, setInvalidPrice] = useState<boolean>(false);

  const [isValueChange, setIsValueChange] = useState<boolean>(false);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const price = e.target.value.split(",").join("");
    if (isNaN(Number(price))) {
      toast(
        <div className="toast error">
          🤔 It appears that an invalid price was entered. Please verify and try
          again.
        </div>
      );
      setInputWidth(1);
      editPage && onConfirmation!(false);
      handleUpdateFormAndLocalStorage(
        editPage ? "edit_price" : "price",
        "0",
        setValue
      );
      return;
    }
    if (Number(price) > PriceLimit.MAX) {
      toast(
        <div className="toast ">
          🤔 Oppss . Price can not be higher then 30.000$/night. Contact our
          support for more details.
        </div>
      );
      editPage && onConfirmation!(false);
      setInvalidPrice(true);
      return;
    }

    if (Number(price) < 14) {
      editPage && onConfirmation!(false);
    } else {
      editPage && onConfirmation!(true);
    }

    setInvalidPrice(false);
    setIsValueChange(true);

    setInputWidth(
      e.target.value.split("")[0] === "0"
        ? 1
        : Number(price).toLocaleString().length
    );

    handleUpdateFormAndLocalStorage(
      editPage ? "edit_price" : "price",
      Number(price).toLocaleString(),
      setValue
    );
  };

  useEffect(() => {
    setInputWidth(selectedPrice!.split("").length);
  }, [selectedPrice]);

  return (
    <motion.div className={styles.price}>
      {!editPage && (
        <>
          <motion.h1
            className={styles.title}
            {...appearAnimation}
            transition={sloverTransition}
          >
            Now, set your price
          </motion.h1>
          <motion.p
            className={styles.description}
            {...deepAppearAnimation}
            transition={sloverTransition}
          >
            You can change it anytime.
          </motion.p>
        </>
      )}
      <motion.div className={styles.price_container}>
        <motion.div
          className={styles.input_wrap}
          {...deepAppearAnimation}
          transition={sloverTransition}
          data-invalid={invalidPrice}
          data-animate={isValueChange}
        >
          <motion.input
            type="text"
            inputMode="numeric"
            id="price"
            className={styles.price_input}
            aria-label="price"
            style={{ maxWidth: `${inputWidth}ch` }}
            autoFocus
            transition={motion_transition}
            {...(register(editPage ? "edit_price" : "price"),
            {
              onChange: handlePriceChange,
              value: selectedPrice,
            })}
          />
          <label htmlFor="price" className={styles.price_label}>
            $
          </label>
          <Tooltip
            placement="top"
            content={"The price you set will be for one night"}
            color="primary"
            size="sm"
            delay={1000}
            classNames={{
              content: ["text-white font-medium bg-[#2f2f2f]"],
            }}
          >
            <span className={styles.price_suffix}>night</span>
          </Tooltip>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
