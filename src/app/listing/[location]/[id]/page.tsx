import React from "react";
import { ListingPageComponent } from "@/components/listingPageComponent";

export default function Page({
  params,
}: {
  params: { location: string; id: string };
}) {
  return <ListingPageComponent isPublic id={params.id} />;
}
