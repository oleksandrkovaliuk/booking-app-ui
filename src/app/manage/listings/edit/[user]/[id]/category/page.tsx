import React from "react";
import { CategoryPageContent } from "./_content";
import { ParamsProps } from "../type";

export default function EditListingCategory({
  params,
}: {
  params: ParamsProps;
}) {
  return <CategoryPageContent params={params} />;
}
