import React from "react";

import { store } from "@/store";
import { getCurrentListing } from "@/store/api/endpoints/listings/getCurrentListing";

import { PriceContent } from "./_content";

import { IParamsProps } from "../type";

export default async function PricePage({ params }: { params: IParamsProps }) {
  const { data: listing } = await store.dispatch(
    getCurrentListing.initiate({
      id: Number(params.id),
    })
  );
  return <PriceContent listing={listing!} />;
}
