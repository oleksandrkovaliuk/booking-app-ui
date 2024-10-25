import React from "react";
import { CloseIcon } from "@/svgs/CloseIcon";

import { IClearDateSelectionProps } from "./type";

import styles from "../search_form_bar.module.scss";

export const ClearInputSelectionButton: React.FC<IClearDateSelectionProps> = ({
  callback,
  show,
  disabled,
}) => {
  return (
    show &&
    !disabled && (
      <button
        disabled={disabled}
        className={styles.clear_input_selection}
        onClick={callback}
      >
        <CloseIcon className={styles.clear_input_selection_icon} />
      </button>
    )
  );
};
