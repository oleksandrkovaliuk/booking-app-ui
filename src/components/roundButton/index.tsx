import React from "react";
import { Tooltip } from "@nextui-org/react";

import { Arrow } from "@/svgs/Arrow";

import { RoundButtonProps } from "./_lib/interfaces";

import styles from "./roundButton.module.scss";

export const RoundButton: React.FC<RoundButtonProps> = ({
  action,
  className,
  arrow_direction,

  showToolTip,
  toolTipPlacement,
  toolTipContent,
  toolTipDelay,
}) => {
  return (
    <Tooltip
      showArrow
      placement={toolTipPlacement}
      content={toolTipContent}
      color="default"
      size="sm"
      delay={toolTipDelay}
      className="custome_tooltip info"
      isDisabled={!showToolTip}
    >
      <button
        onClick={action}
        className={`${styles.round_button} ${className}`}
        data-arrow-direction={arrow_direction}
      >
        <Arrow className={styles.round_icon} />
      </button>
    </Tooltip>
  );
};
