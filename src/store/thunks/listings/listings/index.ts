import { createAsyncThunk } from "@reduxjs/toolkit";

import { GetListings } from "@/app/api/apiCalls";

export const getAllListings = createAsyncThunk(
  "listings/listings",
  async () => {
    try {
      const res = await GetListings();
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
