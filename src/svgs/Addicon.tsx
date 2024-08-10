import React from "react";
import { SvgProps } from "@/utilities/interfaces";
export const AddIcon: React.FC<SvgProps> = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path d="M18 6L6 18M6 6l12 12"></path>
    </svg>
  );
};
