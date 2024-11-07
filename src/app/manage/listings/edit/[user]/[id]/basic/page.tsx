import React from "react";
import { BasicContent } from "./_content";

import { IParamsProps } from "../type";
import { store } from "@/store";
import { getCurrentListing } from "@/store/api/endpoints/listings/getCurrentListing";

export default async function BasicPage({ params }: { params: IParamsProps }) {
  const { data: listing } = await store.dispatch(
    getCurrentListing.initiate({
      id: Number(params.id),
    })
  );
  return <BasicContent listing={listing!} />;
}
