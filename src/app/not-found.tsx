import React from "react";
import { NotFoundIcon } from "@/svgs/NotFoundIcon";

import "@/app/error.scss";

export default function Custom404() {
  return (
    <div className="error_wrap">
      <NotFoundIcon />
      <h2>404</h2>
    </div>
  );
}
