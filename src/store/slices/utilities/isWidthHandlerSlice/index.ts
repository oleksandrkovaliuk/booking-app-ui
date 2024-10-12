import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getWindowState = () => {
  if (typeof window !== "undefined") {
    const width = window?.innerWidth;

    return {
      mobile: width <= 768,
      tablet: width <= 1080,
      desktop: width >= 1081,
    };
  }

  return {
    mobile: false,
    tablet: false,
    desktop: false,
  };
};

const WidthHandler = createSlice({
  name: "WidthHandler",
  initialState: getWindowState(),
  reducers: {
    setWidth: (
      state,
      action: PayloadAction<{
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
      }>
    ) => {
      return {
        ...state,
        mobile: action.payload.mobile,
        tablet: action.payload.tablet,
        desktop: action.payload.desktop,
      };
    },
  },
});

export const { setWidth } = WidthHandler.actions;

export default WidthHandler.reducer;
