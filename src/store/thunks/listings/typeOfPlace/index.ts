import { createAsyncThunk } from "@reduxjs/toolkit";

import { GetTypeOfPlace } from "@/app/api/apiCalls";

export const getTypeOfPlace = createAsyncThunk(
  "listings/typeofplace",
  async () => {
    try {
      const res = await GetTypeOfPlace();
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
