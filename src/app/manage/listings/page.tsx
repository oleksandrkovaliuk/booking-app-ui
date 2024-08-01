"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button, ScrollShadow, Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { FormState } from "../_components/createForm/createForm";

import styles from "./listings.module.scss";

interface ListingInProgress extends FormState {
  startingDate: string;
}
export default function ListingsPage() {
  const { data: session } = useSession();
  const [listingInProgress, setListingInProgress] =
    useState<ListingInProgress | null>(null);

  useLayoutEffect(() => {
    if (typeof localStorage !== "undefined") {
      const date = localStorage.getItem("startingDate");
      const address = localStorage.getItem("address");

      console.log(date, address);
      if (date || address) {
        setListingInProgress({
          startingDate: date ? JSON.parse(date) : null,
          address: address ? JSON.parse(address) : null,
        });
      }
    }
  }, []);
  console.log(listingInProgress, "listingInProgress");

  return (
    <div className={styles.listing_page_container}>
      <section className={styles.title_section}>
        <h1 className={styles.welcoming_text}>
          Welcome{" "}
          {session?.user.name && `, ${session?.user?.name?.split(" ")[0]}`}!
        </h1>
        <Link href="/manage/listings/create">
          <Button className={styles.create_listing_button} size="sm">
            Create your listing
          </Button>
        </Link>
      </section>
      <section className={styles.listings_container}>
        <ScrollShadow>
          {listingInProgress && (
            <div className={styles.listing_in_progress}>
              <Link href="/manage/listings/create">
                <Skeleton className={styles.skeleton}>
                  <div className={styles.listing_in_progress_img}></div>
                </Skeleton>
                <p className={styles.listing_in_progress_text}>
                  You made the last changes on{" "}
                  <span>{listingInProgress.startingDate}</span> for the listing
                  located at{" "}
                  {listingInProgress.address && (
                    <span>{listingInProgress.address}.</span>
                  )}
                </p>
                <div className={styles.status}>
                  <span className={styles.circle} />
                  <span className={styles.status_text}>In progress</span>
                </div>
              </Link>
            </div>
          )}
        </ScrollShadow>
      </section>
    </div>
  );
}
