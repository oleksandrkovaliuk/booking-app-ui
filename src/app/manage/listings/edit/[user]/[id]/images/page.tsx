import React from "react";
import { ParamsProps } from "../type";
import { ImagesContent } from "./_content";

export default function ImagesPage({ params }: { params: ParamsProps }) {
  return <ImagesContent params={params} />;
}
