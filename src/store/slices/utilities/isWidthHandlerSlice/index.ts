import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  isWidthEqualTo: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
} = {
  isWidthEqualTo: {
    mobile: false,
    tablet: false,
    desktop: false,
  },
};

const WidthHandler = createSlice({
  name: "WidthHandler",
  initialState,
  reducers: {
    setWidth: (
      state,
      action: PayloadAction<{
        isWidthEqualTo: { mobile: boolean; tablet: boolean; desktop: boolean };
      }>
    ) => {
      return {
        isWidthEqualTo: {
          ...state.isWidthEqualTo,
          mobile: action.payload.isWidthEqualTo.mobile,
          tablet: action.payload.isWidthEqualTo.tablet,
          desktop: action.payload.isWidthEqualTo.desktop,
        },
      };
    },
  },
});

export const { setWidth } = WidthHandler.actions;

export default WidthHandler.reducer;
