import { RootState } from "..";
import { createSelector } from "@reduxjs/toolkit";
import { today, getLocalTimeZone } from "@internationalized/date";

import { ParseLocalStorageDates } from "@/helpers/dateManagment";

const searchSelection = (state: RootState) => state.searchSelection;

export const searchSelectionSelector = (params?: URLSearchParams) =>
  createSelector(
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
      const parsedSearchDate =
        params && params.get("search_date")
          ? ParseLocalStorageDates(params.get("search_date")!)
          : search_date
          ? ParseLocalStorageDates(search_date)
          : {
              start: today(getLocalTimeZone()),
              end: today(getLocalTimeZone()).add({ weeks: 1 }),
            };

      return {
        search_place,
        parsedSearchDate,
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
