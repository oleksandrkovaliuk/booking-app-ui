import { createAsyncThunk } from "@reduxjs/toolkit";

import { GetCurrentUserListings } from "@/app/api/apiCalls";

export const getCurrentUserListings = createAsyncThunk(
  "listing/get/current",
  async ({ id, user_name }: { id: number; user_name: string }) => {
    try {
      const res = await GetCurrentUserListings({ id, user_name });
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
