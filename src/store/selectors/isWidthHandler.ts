import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "..";

const isWidthHandler = (state: RootState) => state.widthHandler;

export const isWidthHandlerSelector = createSelector(
  [isWidthHandler],
  ({ mobile, tablet, desktop }) => {
    return {
      mobile,
      tablet,
      desktop,
    };
  }
);
