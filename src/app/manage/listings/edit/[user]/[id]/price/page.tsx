import React from "react";
import { PriceContent } from "./_content";

import { IParamsProps } from "../type";

export default function PricePage({ params }: { params: IParamsProps }) {
  return <PriceContent params={params} />;
}
