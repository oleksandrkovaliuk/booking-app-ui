import React from "react";
import { TypeContent } from "./_content";

import { ParamsProps } from "../type";

export default function EditType({ params }: { params: ParamsProps }) {
  return <TypeContent params={params} />;
}
