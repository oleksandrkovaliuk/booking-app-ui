import React from "react";
import { CalendarPageContent } from "./content";

export default function CalendarPage({ params }: { params: { id: string } }) {
  return <CalendarPageContent params={params} />;
}
