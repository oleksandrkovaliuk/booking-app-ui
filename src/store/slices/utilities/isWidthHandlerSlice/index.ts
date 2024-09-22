import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  isWidthEqualTo: {
    768: boolean;
    1080: boolean;
    1280: boolean;
  };
} = {
  isWidthEqualTo: {
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
        isWidthEqualTo: { 768: boolean; 1080: boolean; 1280: boolean };
      }>
    ) => {
      return {
        isWidthEqualTo: {
          ...state.isWidthEqualTo,
          [768]: action.payload.isWidthEqualTo[768],
          [1080]: action.payload.isWidthEqualTo[1080],
          [1280]: action.payload.isWidthEqualTo[1280],
        },
      };
    },
  },
});

export const { setWidth } = WidthHandler.actions;

export default WidthHandler.reducer;
