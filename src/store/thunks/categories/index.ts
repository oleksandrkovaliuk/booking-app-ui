import { GetListingsCategories } from "@/app/api/apiCalls";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllCategories = createAsyncThunk(
  "listings/categories",
  async () => {
    try {
      const res = await GetListingsCategories();
      console.log(res.data, "res.data");
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
