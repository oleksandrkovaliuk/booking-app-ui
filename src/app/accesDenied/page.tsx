"use client";

import { LockIcon } from "@/svgs/LockIcon";
import { Button } from "@nextui-org/react";
import Link from "next/link";

import "@/app/error.scss";

export default function Accessdenied() {
  return (
    <div className="error_wrap">
      <LockIcon />
      <h2>Opppsss...</h2>
      <p>
        Acces was denied to your account. You doesnt have access to this page.
      </p>
      <div className="buttons">
        <Button color="primary" size="lg" variant="flat">
          <Link href="/">Back to home </Link>
        </Button>
      </div>
    </div>
  );
}
