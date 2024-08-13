import { getAllCategories } from "@/store/thunks/listings/categories";
import { getTypeOfPlace } from "@/store/thunks/listings/typeOfPlace";
import { createSlice } from "@reduxjs/toolkit";
import { State } from "./type";
import { getAllListings } from "@/store/thunks/listings/listings";
import { ParseJSONFields } from "@/sharing/parseJSONFields";
import { ListingState } from "@/app/api/apiCalls";

const initialState: State = {
  categories: [],
  typeOfPlace: [],
  listings: [],
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
    });
    builder.addCase(getAllListings.fulfilled, (state, action) => {
      state.listings = action.payload.map((listing: ListingState) =>
        ParseJSONFields(listing)
      );
    });
    builder.addCase(getAllListings.rejected, (state) => {
      state.listings = [];
    });
  },
});

export const { actions, reducer } = listingsInfo;
