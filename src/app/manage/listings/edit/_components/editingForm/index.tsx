"use client";
import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/store";
import { EditingFormProps } from "./type";
import { ListingState } from "@/app/api/apiCalls";

export const EditingForm: React.FC<EditingFormProps> = ({ params }) => {
  console.log(params);
  const { listings } = useSelector((state: RootState) => state.listingsInfo);
  const listing: ListingState[] = listings.filter(
    (listing) => listing.id === Number(params.id)
  );
  console.log(listing);

  return (
    <div style={{ height: "100000px" }}>
      {listing.map((item) => {
        return <div key={item.id}>{JSON.stringify(item)}</div>;
      })}
    </div>
  );
};
