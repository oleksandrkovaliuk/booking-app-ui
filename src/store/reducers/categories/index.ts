import { getAllCategories } from "@/store/thunks/categories";
import { createReducer } from "@reduxjs/toolkit";
interface State {
  categories: {
    id: number;
    category_name: string;
    category_icon?: string;
  }[];
}
const initState: State = {
  categories: [],
};

export const categoriesReducer = createReducer(initState, (builder) => {
  builder.addCase(getAllCategories.pending, (state) => {
    state.categories = [];
    return state;
  });
  builder.addCase(getAllCategories.fulfilled, (state, action) => {
    console.log(action.payload, "action.payload");
    state.categories = action.payload;
    return state;
  });
  builder.addCase(getAllCategories.rejected, (state) => {
    state.categories = [];
    return state;
  });
});
