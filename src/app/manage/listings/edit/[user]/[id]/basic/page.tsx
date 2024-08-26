import React from "react";
import { BasicContent } from "./_content";

import { ParamsProps } from "../type";

export default function BasicPage({ params }: { params: ParamsProps }) {
  return <BasicContent params={params} />;
}
