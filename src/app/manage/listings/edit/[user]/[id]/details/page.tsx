import React from "react";
import { DetailsContent } from "./_content";
import { ParamsProps } from "../type";

export default function DetailsPage({ params }: { params: ParamsProps }) {
  return <DetailsContent params={params} />;
}
