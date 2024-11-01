import { createSlice } from "@reduxjs/toolkit";
import { IListingState } from "@/store/api/lib/interfaces";

const initialState = {
  listings: [] as IListingState[],
};

const listingSearchResponse = createSlice({
  name: "listingSearchResponse",
  initialState,
  reducers: {
    setListings: (state, action) => {
      state.listings = action.payload;
    },
  },
});

export const { setListings } = listingSearchResponse.actions;
export default listingSearchResponse.reducer;
