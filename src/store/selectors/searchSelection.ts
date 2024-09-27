import { RootState } from "..";
import { createSelector } from "@reduxjs/toolkit";

const searchSelection = (state: RootState) => state.searchSelection;

export const searchSelectionSelector = createSelector(
  [searchSelection],
  ({
    search_place,
    search_date,
    search_amountOfGuests,
    search_includePets,
    search_category_id,
    filter_price_range,
    filter_type_of_place,
    filter_accesable,
    filter_shared_room,
  }) => {
    return {
      search_place,
      search_date,
      search_amountOfGuests,
      search_includePets,
      search_category_id,
      filter_price_range,
      filter_type_of_place,
      filter_accesable,
      filter_shared_room,
    };
  }
);
