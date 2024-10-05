import React from "react";
import { Tooltip } from "@nextui-org/react";

import { Arrow } from "@/svgs/RightArrow";

import { RoundButtonProps } from "./_lib/interfaces";

import styles from "./roundButton.module.scss";

export const RoundButton: React.FC<RoundButtonProps> = ({
  action,
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
      classNames={{
        content: ["text-#2f2f2f font-medium rounded-lg py-0.5 px-2"],
      }}
      isDisabled={!showToolTip}
    >
      <button
        className={styles.round_button}
        onClick={action}
        data-arrow-direction={arrow_direction}
      >
        <Arrow className={styles.round_icon} />
      </button>
    </Tooltip>
  );
};
