import { createSlice } from "@reduxjs/toolkit";

import { globalCalendarState } from "./type";
import { today, getLocalTimeZone } from "@internationalized/date";
import { DateValue } from "@nextui-org/calendar";

const initialState: globalCalendarState = {
  start: today(getLocalTimeZone()),
  end: today(getLocalTimeZone()).add({ weeks: 1 }),
};
const userDateSelection = createSlice({
  name: "userDateSelection",
  initialState,
  reducers: {
    setCheckIn: (state, action) => {
      return (state = {
        ...state,
        start: action.payload,
      });
    },
    setCheckOut: (state, action) => {
      return (state = {
        ...state,
        end: action.payload,
      });
    },
    setResetDate: (state) => {
      return (state = {
        ...initialState,
      });
    },
  },
});

export const { setCheckIn, setCheckOut, setResetDate } =
  userDateSelection.actions;
export default userDateSelection.reducer;
