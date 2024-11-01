import React from "react";
import { CategoryPageContent } from "./_content";

import { IParamsProps } from "../type";

export default function EditListingCategory({
  params,
}: {
  params: IParamsProps;
}) {
  return <CategoryPageContent params={params} />;
}
