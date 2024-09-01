import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetUserListings } from "@/app/api/apiCalls";

export const getUserListings = createAsyncThunk(
  "listings/get/user/listings",
  async ({
    user_name,
    user_email,
  }: {
    user_name: string;
    user_email: string;
  }) => {
    try {
      const res = await GetUserListings({ user_name, user_email });
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
