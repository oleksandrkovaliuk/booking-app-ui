import React from "react";
import { ParamsProps } from "../type";
import { PriceContent } from "./_content";

export default function PricePage({ params }: { params: ParamsProps }) {
  return <PriceContent params={params} />;
}
