"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Button, Skeleton, Tooltip } from "@nextui-org/react";

import { NotFoundIcon } from "@/svgs/NotFoundIcon";

import { useGetUserListingsQuery } from "@/store/api/endpoints/listings/getUserListings";

import { FormState } from "../../_components/type";
import { ListingCard } from "@/components/listingCard";
import { StatusBadge } from "@/components/statusBadge";
import { appearAnimation, motion_transition } from "../../_components/consts";
import { SkeletonListingCard } from "@/components/listingCard/components/skeleton";

import { skeletonData } from "@/information/data";

import styles from "./listings.module.scss";

export const ListingsPage: React.FC = () => {
  const { data: session } = useSession();

  const { data: listings, isLoading } = useGetUserListingsQuery({
    user_name: session?.user?.name!,
    user_email: session?.user?.email!,
  });

  const [listingInProccess, setListingInProgress] = useState<FormState | null>(
    null
  );

  const dataInProccess =
    !listingInProccess?.images &&
    !listingInProccess?.title &&
    !listingInProccess?.price;

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const date = localStorage.getItem("startingDate");
      const address = localStorage.getItem("address");
      const title = localStorage.getItem("title");
      const images = localStorage.getItem("images");
      const price = localStorage.getItem("price");

      if (date || address) {
        setListingInProgress({
          startingDate: date && JSON.parse(date),
          address: address && JSON.parse(address),
          title: title && JSON.parse(title),
          images: images && JSON.parse(images),
          price: price && JSON.parse(price),
        } as FormState | null);
      }
    }
  }, []);

  return (
    <div className={styles.listing_page_container}>
      <section className={styles.title_section}>
        <h1 className={styles.welcoming_text}>
          Welcome{" "}
          {session?.user.name && `, ${session?.user?.name?.split(" ")[0]}`}!
        </h1>
        <Link href={!isLoading ? "/manage/listings/create" : "#"}>
          <Button className={styles.create_listing_button} size="sm">
            {listingInProccess ? "Continue creating" : "Create Listing"}
          </Button>
        </Link>
      </section>
      <section className={styles.listings_container}>
        {!listings?.length && !isLoading && !listingInProccess && (
          <Link
            href={!isLoading ? "/manage/listings/create" : "#"}
            className={styles.empty_page}
          >
            <Tooltip
              placement="top"
              content={"Create your first listing"}
              color="primary"
              size="sm"
              delay={1500}
              classNames={{
                content: ["text-white font-medium bg-[#2f2f2f]"],
              }}
            >
              <motion.div {...appearAnimation} transition={motion_transition}>
                <NotFoundIcon className={styles.not_found_icon} />
              </motion.div>
            </Tooltip>
          </Link>
        )}
        {listingInProccess &&
          !isLoading &&
          (dataInProccess ? (
            <div className={styles.listing_in_progress}>
              <Link href={!isLoading ? "/manage/listings/create" : "#"}>
                <Skeleton className={styles.skeleton}>
                  <div className={styles.listing_in_progress_img}></div>
                </Skeleton>
                <p className={styles.listing_in_progress_text}>
                  You made the last changes on{" "}
                  <span>{listingInProccess.startingDate}</span> for the listing
                  located at{" "}
                  {listingInProccess.address && (
                    <span>{listingInProccess.address.formattedAddress}</span>
                  )}
                </p>
                <StatusBadge status="In progress" color="#ffa836" />
              </Link>
            </div>
          ) : (
            <ListingCard
              images={listingInProccess?.images}
              title={listingInProccess?.title}
              price={listingInProccess?.price}
              isInProccess
            />
          ))}

        {isLoading
          ? skeletonData.map((item) => (
              <SkeletonListingCard key={item} item={item} size="lg" />
            ))
          : listings?.map((item) => (
              <ListingCard
                key={item.id}
                id={item.id!}
                isManagable
                isComplete={item.iscomplete}
                price={item.price}
                title={item.title}
                images={item.images}
                guests={item.guests}
                address={item.address}
                type={item.type}
                pets_allowed={item.pets_allowed}
                accesable={item.accesable}
              />
            ))}
      </section>
    </div>
  );
};
