import { getAllCategories } from "@/store/thunks/listings/categories";
import { getTypeOfPlace } from "@/store/thunks/listings/typeOfPlace";
import { createSlice } from "@reduxjs/toolkit";
export interface Category {
  id: number;
  category_name: string;
  category_icon?: string;
}

export interface TypeOfPlace {
  id: number;
  type_name: string;
  type_img: string;
  type_description: string;
}

interface State {
  categories: Category[];
  typeOfPlace: TypeOfPlace[];
}

const initialState: State = {
  categories: [],
  typeOfPlace: [],
};

const listingsAdditionalsSlice = createSlice({
  name: "listingsAdditionals",
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
  },
});

export const { actions, reducer } = listingsAdditionalsSlice;
