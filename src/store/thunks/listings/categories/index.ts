import { createAsyncThunk } from "@reduxjs/toolkit";

import { GetListingsCategories } from "@/app/api/apiCalls";

export const getAllCategories = createAsyncThunk(
  "listings/categories",
  async () => {
    try {
      const res = await GetListingsCategories();
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
