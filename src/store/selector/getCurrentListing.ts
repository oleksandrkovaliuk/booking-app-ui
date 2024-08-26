import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@/store";

const getListings = (state: RootState) => state.listingsInfo.listings;

export const getCurrentListing = createSelector(
  [getListings, (_, id: string) => id],
  (listings, id) => listings?.filter((listing) => listing.id === Number(id))[0]
);
