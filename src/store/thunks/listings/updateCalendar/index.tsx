import { createAsyncThunk } from "@reduxjs/toolkit";
import { SetDisabledDates } from "@/app/api/apiCalls";
import { toast } from "sonner";

export const updateCalendar = createAsyncThunk(
  "listings/updateCalendar",
  async ({ disabledDates, id }: { disabledDates: Date[]; id: number }) => {
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
