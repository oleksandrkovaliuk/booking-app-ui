"use client";
import React from "react";

import styles from "./listings.module.scss";
import ManageLayout from "../manageLayout";
import { useSession } from "next-auth/react";
import { Button, useDisclosure } from "@nextui-org/react";
import Link from "next/link";

export default function ListingsPage() {
  const { data: session } = useSession();

  return (
    <ManageLayout>
      <div className={styles.listing_page_container}>
        <section className={styles.title_section}>
          <h1 className={styles.welcoming_text}>
            Welcome , {session?.user?.name?.split(" ")[0]}!
          </h1>
          <Link href="/manage/listings/create">
            <Button className={styles.create_listing_button} size="sm">
              Create your listing
            </Button>
          </Link>
        </section>
      </div>
    </ManageLayout>
  );
}
