import React from "react";
import { ReserveContent } from "./content/reservePage";

export default function ReserveListingPage({
  params,
}: Readonly<{ params: { location: string; id: string } }>) {
  return <ReserveContent params={params} />;
}
