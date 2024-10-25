import React from "react";
import { ImagesContent } from "./_content";

import { IParamsProps } from "../type";

export default function ImagesPage({ params }: { params: IParamsProps }) {
  return <ImagesContent params={params} />;
}
