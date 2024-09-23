import { RootState } from "..";
import { createSelector } from "@reduxjs/toolkit";

const searchSelection = (state: RootState) => state.searchSelection;

export const searchSelectionSelector = createSelector(
  [searchSelection],
  (searchSelection) => {
    return {
      ...searchSelection,
    };
  }
);
