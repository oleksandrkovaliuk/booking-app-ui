import { createAsyncThunk } from "@reduxjs/toolkit";

import { CreateListing, ListingState } from "@/app/api/apiCalls";
import { toast } from "sonner";

export const RequestCreateListing = createAsyncThunk(
  "listings/createListing",
  async ({
    hostname,
    hostemail,
    category,
    type,
    cordinates,
    address,
    guests,
    accesable,
    pets_allowed,
    images,
    title,
    aboutplace,
    placeis,
    notes,
    price,
  }: ListingState) => {
    try {
      const res = await CreateListing({
        hostname,
        hostemail,
        category,
        type,
        cordinates,
        address,
        guests,
        accesable,
        pets_allowed,
        images,
        title,
        aboutplace,
        placeis,
        notes,
        price,
      });
      return res.data;
    } catch (error) {
      toast.error((error as Error).message);
      return error;
    }
  }
);
