import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFetched: true,
  isSearchTriggered: false,
};

const isSearchTriggered = createSlice({
  name: "isSearchTriggered",
  initialState,
  reducers: {
    setFetch: (state, action) => {
      state.isFetched = action.payload;
    },
    setIsSearchTriggered: (state, action) => {
      state.isSearchTriggered = action.payload;
    },
  },
});

export const { setFetch, setIsSearchTriggered } = isSearchTriggered.actions;
export default isSearchTriggered.reducer;
