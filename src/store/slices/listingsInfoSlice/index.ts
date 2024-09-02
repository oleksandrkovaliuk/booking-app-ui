import { createSlice } from "@reduxjs/toolkit";

import { RequestDeleteListing } from "@/store/thunks/listings/delete";

import { State } from "./type";

const initialState: State = {
  listings: [],
};

const listingsInfo = createSlice({
  name: "listingsInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(RequestDeleteListing.fulfilled, (state, action) => {
      state.listings = action.payload;
    });
  },
});

export const { actions, reducer } = listingsInfo;
