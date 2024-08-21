"use client";
import React from "react";

import { ListingState } from "@/app/api/apiCalls";
import { useSelector } from "@/store";

export default function Page({
  params,
}: {
  params: { location: string; id: string };
}) {
  const { listings } = useSelector((state) => state.listingsInfo);
  const listing: ListingState[] = listings.filter(
    (listing) => listing.id === Number(params.id)
  );

  return <div>{JSON.stringify(listing)}</div>;
}
