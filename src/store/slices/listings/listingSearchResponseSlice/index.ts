import { createSlice } from "@reduxjs/toolkit";
import { ListingState } from "@/store/api/lib/type";

const initialState = {
  listings: [] as ListingState[],
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
