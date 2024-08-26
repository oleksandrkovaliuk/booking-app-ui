import React from "react";
import { Button } from "@nextui-org/react";

import { ConfirmationButtonProps } from "./type";

import styles from "./confirmationButton.module.scss";

export const ConfirmationButton: React.FC<ConfirmationButtonProps> = ({
  children,
  onConfirm,
  trigger,
  position,
}) => {
  return (
    <Button
      variant="solid"
      className={styles.confirmation_button}
      data-position={position}
      data-changes-maden={trigger}
      onClick={onConfirm}
    >
      {children}
    </Button>
  );
};
