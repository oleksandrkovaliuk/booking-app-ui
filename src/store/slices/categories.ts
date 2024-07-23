import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initState,
  reducers: {
    setCategories: (state, action: PayloadAction<State["categories"]>) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
