import React from "react";
import { TypeContent } from "./_content";

import { IParamsProps } from "../type";

export default function EditType({ params }: { params: IParamsProps }) {
  return <TypeContent params={params} />;
}
