import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  isWidthEqual: {
    768: boolean;
    1080: boolean;
    1280: boolean;
  };
} = {
  isWidthEqual: {
    768: false,
    1080: false,
    1280: false,
  },
};

const WidthHandler = createSlice({
  name: "WidthHandler",
  initialState,
  reducers: {
    setWidth: (
      state,
      action: PayloadAction<{
        isWidthEqual: { 768: boolean; 1080: boolean; 1280: boolean };
      }>
    ) => {
      return {
        isWidthEqual: {
          ...state.isWidthEqual,
          [768]: action.payload.isWidthEqual[768],
          [1080]: action.payload.isWidthEqual[1080],
          [1280]: action.payload.isWidthEqual[1280],
        },
      };
    },
  },
});

export const { setWidth } = WidthHandler.actions;

export default WidthHandler.reducer;
