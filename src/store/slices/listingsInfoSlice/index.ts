import { createSlice } from "@reduxjs/toolkit";

import { State } from "./type";

import { getAllCategories } from "@/store/thunks/listings/categories";
import { getTypeOfPlace } from "@/store/thunks/listings/typeOfPlace";
import { getAllListings } from "@/store/thunks/listings/listings";
import { RequestDeleteListing } from "@/store/thunks/listings/delete";

const initialState: State = {
  categories: [],
  typeOfPlace: [],
  listings: [],
  isLoading: false,
};

const listingsInfo = createSlice({
  name: "listingsInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.pending, (state) => {
      state.categories = [];
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(getAllCategories.rejected, (state) => {
      state.categories = [];
    });

    builder.addCase(getTypeOfPlace.pending, (state) => {
      state.typeOfPlace = [];
    });
    builder.addCase(getTypeOfPlace.fulfilled, (state, action) => {
      state.typeOfPlace = action.payload;
    });
    builder.addCase(getTypeOfPlace.rejected, (state) => {
      state.typeOfPlace = [];
    });

    builder.addCase(getAllListings.pending, (state) => {
      state.listings = [];
      state.isLoading = true;
    });
    builder.addCase(getAllListings.fulfilled, (state, action) => {
      state.listings = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllListings.rejected, (state) => {
      state.listings = [];
      state.isLoading = false;
    });

    builder.addCase(RequestDeleteListing.fulfilled, (state, action) => {
      console.log(action.payload);
      state.listings = action.payload;
    });
  },
});

export const { actions, reducer } = listingsInfo;
