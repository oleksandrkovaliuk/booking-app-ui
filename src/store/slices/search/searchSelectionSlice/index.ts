import { searchParamsKeys } from "@/layout/header/_lib/enums";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Partial<{
  [key in searchParamsKeys]: string | null;
}> = {
  [searchParamsKeys.SEARCH_PLACE]: null,
  [searchParamsKeys.SEARCH_DATE]: null,
  [searchParamsKeys.SEARCH_AMOUNT_OF_GUESTS]: null,
  [searchParamsKeys.SEARCH_INCLUDE_PETS]: null,
  [searchParamsKeys.FILTER_PRICE_RANGE]: null,
  [searchParamsKeys.FILTER_TYPE_OF_PLACE]: null,
  [searchParamsKeys.FILTER_ACCESABLE]: null,
  [searchParamsKeys.FILTER_SHARED_ROOM]: null,

  [searchParamsKeys.SEARCH_CATEGORY_ID]: null,
};

export const searchSelectionSlice = createSlice({
  name: "searchSelection",
  initialState,
  reducers: {
    setSearchSelection: (
      state,
      action: PayloadAction<
        Partial<{ [key in searchParamsKeys]: string | null }>
      >
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    clearSearchSelection: (state) => {
      return initialState;
    },
  },
});

export const { setSearchSelection, clearSearchSelection } =
  searchSelectionSlice.actions;

export default searchSelectionSlice.reducer;
