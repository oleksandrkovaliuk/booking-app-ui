import React from "react";

import { store } from "@/store";
import { getCurrentListing } from "@/store/api/endpoints/listings/getCurrentListing";

import { CalendarPageContent } from "./content";

export default async function CalendarPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: listing } = await store.dispatch(
    getCurrentListing.initiate({
      id: Number(params.id),
    })
  );
  return <CalendarPageContent params={params} listing={listing!} />;
}
