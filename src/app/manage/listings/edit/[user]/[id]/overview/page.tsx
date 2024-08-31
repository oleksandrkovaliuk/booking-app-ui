import React from "react";

import { ParamsProps } from "../type";

import { ListingPageComponent } from "@/components/listingPageComponent";

export default function EditListing({ params }: { params: ParamsProps }) {
  return <ListingPageComponent id={params.id} />;
}
