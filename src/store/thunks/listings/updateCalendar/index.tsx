import { toast } from "sonner";
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
      return toast.success("Disabled dates updated");
    } catch (error) {
      return error;
    }
  }
);
