import React, { useEffect, useState } from "react";
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
  register,
  selectedPrice,
  handleUpdateFormAndLocalStorage,
}) => {
  const [inputWidth, setInputWidth] = useState<number>(
    selectedPrice.split("").length
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
      handleUpdateFormAndLocalStorage("price", "0");
      return;
    }
    if (Number(price) >= PriceLimit.MAX) {
      toast(
        <div className="toast ">
          🤔 Oppss . Price can not be higher then 30.000$/night. Contact our
          support for more details.
        </div>
      );
      setInvalidPrice(true);
      return;
    }
    if (Number(price) < PriceLimit.MIN) {
      toast(
        <div className="toast ">
          🤔 Oppss . Price can not be lower then 14$/night. Contact our support
          for more details.
        </div>
      );
      setInvalidPrice(true);
    }
    setInputWidth(
      e.target.value.split("")[0] === "0"
        ? 1
        : Number(price).toLocaleString().length
    );
    setInvalidPrice(false);
    handleUpdateFormAndLocalStorage("price", Number(price).toLocaleString());
    setIsValueChange(true);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isValueChange) {
      timer = setTimeout(() => {
        setIsValueChange(false);
      }, 200);
    }

    return () => clearTimeout(timer);
  }, [isValueChange]);
  return (
    <motion.div className={styles.price}>
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
            min={PriceLimit.MIN}
            aria-label="price"
            style={{ maxWidth: `${inputWidth}ch` }}
            transition={motion_transition}
            {...(register("price"),
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
