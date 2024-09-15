import React from "react";
import { CloseIcon } from "@/svgs/CloseIcon";

import { useIsSearchTriggeredApi } from "@/app/_lib/context";

import { ClearDateSelectionProps } from "./type";

import styles from "../search_form_bar.module.scss";

export const ClearInputSelectionButton: React.FC<ClearDateSelectionProps> = ({
  callback,
  show,
  disabled,
}) => {
  const { setIsSearchTriggered } = useIsSearchTriggeredApi();

  return (
    show &&
    !disabled && (
      <button
        disabled={disabled}
        className={styles.clear_input_selection}
        onClick={(e) => {
          callback(e);
          setIsSearchTriggered(false);
        }}
      >
        <CloseIcon className={styles.clear_input_selection_icon} />
      </button>
    )
  );
};
