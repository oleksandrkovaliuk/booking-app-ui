import { DateValue } from "@nextui-org/calendar";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { SetDisabledDates } from "@/app/api/apiCalls";

export const updateCalendar = createAsyncThunk(
  "listings/updateCalendar",
  async ({ disabledDates, id }: { disabledDates: DateValue[]; id: number }) => {
    try {
      await SetDisabledDates({
        disabledDates,
        id,
      });
    } catch (error) {
      return error;
    }
  }
);
