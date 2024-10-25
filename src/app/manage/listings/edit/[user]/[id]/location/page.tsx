import React from "react";
import { LocationContent } from "./_content";

import { IParamsProps } from "../type";

export default function LocationPage({ params }: { params: IParamsProps }) {
  return <LocationContent params={params} />;
}
