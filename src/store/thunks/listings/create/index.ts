import { createAsyncThunk } from "@reduxjs/toolkit";

import { CreateListing, ListingState } from "@/app/api/apiCalls";

export const RequestCreateListing = createAsyncThunk(
  "listings/createListing",
  async ({
    hostname,
    hostemail,
    category,
    typeOfPlace,
    cordinates,
    address,
    guests,
    additionalDetails,
    images,
    title,
    aboutPlace,
    placeIs,
    notes,
    price,
  }: ListingState) => {
    try {
      const res = await CreateListing({
        hostname,
        hostemail,
        category,
        typeOfPlace,
        cordinates,
        address,
        guests,
        additionalDetails,
        images,
        title,
        aboutPlace,
        placeIs,
        notes,
        price,
      });
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
