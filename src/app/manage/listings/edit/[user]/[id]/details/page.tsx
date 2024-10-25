import React from "react";
import { DetailsContent } from "./_content";

import { IParamsProps } from "../type";

export default function DetailsPage({ params }: { params: IParamsProps }) {
  return <DetailsContent params={params} />;
}
