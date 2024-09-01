import React from "react";
import { Button } from "@nextui-org/react";

import { ConfirmationButtonProps } from "./type";

import styles from "./confirmationButton.module.scss";

export const ConfirmationButton: React.FC<ConfirmationButtonProps> = ({
  children,
  onConfirm,
  enable,
  position,
}) => {
  return (
    <Button
      variant="solid"
      disabled={!enable}
      className={styles.confirmation_button}
      data-position={position}
      onClick={enable ? onConfirm : () => null}
    >
      {children}
    </Button>
  );
};
