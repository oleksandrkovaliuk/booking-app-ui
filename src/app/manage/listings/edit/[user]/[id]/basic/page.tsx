import React from "react";
import { BasicContent } from "./_content";

import { IParamsProps } from "../type";

export default function BasicPage({ params }: { params: IParamsProps }) {
  return <BasicContent params={params} />;
}
