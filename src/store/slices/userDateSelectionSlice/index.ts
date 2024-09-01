import { createSlice } from "@reduxjs/toolkit";

import { GlobalCalendarState } from "./type";
import { today, getLocalTimeZone } from "@internationalized/date";

const initialState: GlobalCalendarState = {
  start: today(getLocalTimeZone()),
  end: today(getLocalTimeZone()).add({ weeks: 1 }),
};
const userDateSelection = createSlice({
  name: "userDateSelection",
  initialState,
  reducers: {
    setCheckIn: (state, action) => {
      return {
        ...state,
        start: action.payload,
      };
    },
    setCheckOut: (state, action) => {
      return {
        ...state,
        end: action.payload,
      };
    },
    setResetDate: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const { setCheckIn, setCheckOut, setResetDate } =
  userDateSelection.actions;
export default userDateSelection.reducer;
