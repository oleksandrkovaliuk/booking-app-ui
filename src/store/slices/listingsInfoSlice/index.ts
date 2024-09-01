import { createSlice } from "@reduxjs/toolkit";

import { getAllCategories } from "@/store/thunks/listings/categories";
import { getTypeOfPlace } from "@/store/thunks/listings/typeOfPlace";
import { getAllListings } from "@/store/thunks/listings/listings";
import { RequestDeleteListing } from "@/store/thunks/listings/delete";

import { getUserListings } from "@/store/thunks/listings/getUserListings";
import { getCurrentUserListings } from "@/store/thunks/listings/getCurrentUserListing";

import { State } from "./type";

const initialState: State = {
  categories: [],
  typeOfPlace: [],
  listings: [],
  isLoading: {
    categories: false,
    typeOfPlace: false,
    listings: false,
  },
};

const listingsInfo = createSlice({
  name: "listingsInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.pending, (state) => {
      state.categories = [];
      state.isLoading = {
        ...state.isLoading,
        categories: true,
      };
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading = {
        ...state.isLoading,
        categories: false,
      };
    });
    builder.addCase(getAllCategories.rejected, (state) => {
      state.categories = [];
      state.isLoading = {
        ...state.isLoading,
        categories: false,
      };
    });

    builder.addCase(getTypeOfPlace.pending, (state) => {
      state.typeOfPlace = [];
      state.isLoading = {
        ...state.isLoading,
        typeOfPlace: true,
      };
    });
    builder.addCase(getTypeOfPlace.fulfilled, (state, action) => {
      state.typeOfPlace = action.payload;
      state.isLoading = {
        ...state.isLoading,
        typeOfPlace: false,
      };
    });
    builder.addCase(getTypeOfPlace.rejected, (state) => {
      state.typeOfPlace = [];
      state.isLoading = {
        ...state.isLoading,
        typeOfPlace: false,
      };
    });

    builder.addCase(getAllListings.pending, (state) => {
      state.listings = [];
      state.isLoading = {
        ...state.isLoading,
        listings: true,
      };
    });
    builder.addCase(getAllListings.fulfilled, (state, action) => {
      state.listings = action.payload;
      state.isLoading = {
        ...state.isLoading,
        listings: false,
      };
    });
    builder.addCase(getAllListings.rejected, (state) => {
      state.listings = [];
      state.isLoading = {
        ...state.isLoading,
        listings: false,
      };
    });

    builder.addCase(getUserListings.pending, (state) => {
      state.listings = [];
      state.isLoading = {
        ...state.isLoading,
        listings: true,
      };
    });
    builder.addCase(getUserListings.fulfilled, (state, action) => {
      state.listings = action.payload;
      state.isLoading = {
        ...state.isLoading,
        listings: false,
      };
    });
    builder.addCase(getUserListings.rejected, (state) => {
      state.listings = [];
      state.isLoading = {
        ...state.isLoading,
        listings: false,
      };
    });
    builder.addCase(getCurrentUserListings.pending, (state) => {
      state.listings = [];
      state.isLoading = {
        ...state.isLoading,
        listings: true,
      };
    });
    builder.addCase(getCurrentUserListings.fulfilled, (state, action) => {
      state.listings = action.payload;
      state.isLoading = {
        ...state.isLoading,
        listings: false,
      };
    });
    builder.addCase(getCurrentUserListings.rejected, (state) => {
      state.listings = [];
      state.isLoading = {
        ...state.isLoading,
        listings: false,
      };
    });

    builder.addCase(RequestDeleteListing.fulfilled, (state, action) => {
      state.listings = action.payload;
    });
  },
});

export const { actions, reducer } = listingsInfo;
