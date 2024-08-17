import { DeleteListing } from "@/app/api/apiCalls";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const RequestDeleteListing = createAsyncThunk(
  "listings/delete",
  async (id: number) => {
    try {
      const res = await DeleteListing(id);
      console.log(res);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
