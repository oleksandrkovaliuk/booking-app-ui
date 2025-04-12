import React, { Suspense } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";

import styles from "./listings.module.scss";
import { ListingsList } from "./listingsList";
import { skeletonData } from "@/information/data";
import { SkeletonListingCard } from "@/components/listingCard/components/skeleton";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/auth";

export const ListingsPage = async () => {
  const session = await getServerSession(authConfig);
  const firstName = session?.user?.name?.split(" ")[0];

  // const isListingInProgress = !!localStorage.getItem("category");
  console.log("session", session);
  return (
    <div className={styles.listing_page_container}>
      <section className={styles.title_section}>
        <h1 className={styles.welcoming_text}>
          Welcome {session?.user.name && `, ${firstName}`}!
        </h1>
        <Link href="/manage/listings/create">
          <Button className={styles.create_listing_button} size="sm">
            Create Listing
          </Button>
        </Link>
      </section>
      <Suspense
        fallback={skeletonData.map((item) => (
          <SkeletonListingCard key={item} item={item} size="lg" />
        ))}
      >
        <ListingsList />
      </Suspense>
    </div>
  );
};
