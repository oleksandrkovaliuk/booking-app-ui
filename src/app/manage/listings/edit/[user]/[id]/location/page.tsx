import React from "react";
import { ParamsProps } from "../type";
import { LocationContent } from "./_content";

export default function LocationPage({ params }: { params: ParamsProps }) {
  return <LocationContent params={params} />;
}
