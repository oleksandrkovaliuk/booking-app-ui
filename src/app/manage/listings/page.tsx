"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Button, ScrollShadow, Skeleton } from "@nextui-org/react";
import Link from "next/link";

import ManageLayout from "../manageLayout";
import { FormState } from "../components/createForm/createForm";

import styles from "./listings.module.scss";

export default function ListingsPage() {
  const { data: session } = useSession();
  const [listingInProgress] = useState<FormState | null>(() => {
    const formState = localStorage.getItem("state")!;
    if (formState) {
      const state = JSON.parse(formState);
      if (
        state.category ||
        state.type ||
        state.cordinates ||
        state.startingDate
      ) {
        return state;
      } else {
        return null;
      }
    } else {
      return null;
    }
  });

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
        <section className={styles.listings_container}>
          <ScrollShadow>
            {listingInProgress && (
              <div className={styles.listing_in_progress}>
                <Link href="/manage/listings/create">
                  <Skeleton className={styles.skeleton}>
                    <div className={styles.listing_in_progress_img}></div>
                  </Skeleton>
                  <p className={styles.listing_in_progress_text}>
                    You began creating a listing on{" "}
                    <span>{listingInProgress.startingDate}</span> at{" "}
                    <span>{listingInProgress.cordinates.name}.</span>
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
    </ManageLayout>
  );
}
