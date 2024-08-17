"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Skeleton, Tooltip } from "@nextui-org/react";

import { RootState } from "@/store";
import { NotFoundIcon } from "@/svgs/NotFoundIcon";
import { FormState } from "../../_components/type";
import { ListingCard } from "@/components/listingCard";
import { StatusBadge } from "@/components/statusBadge";
import { getAllListings } from "@/store/thunks/listings/listings";
import { appearAnimation, motion_transition } from "../../_components/consts";

import styles from "./listings.module.scss";

export const ListingsPage: React.FC = () => {
  const dispath = useDispatch();
  const { data: session } = useSession();

  const { listings, isLoading } = useSelector(
    (state: RootState) => state.listingsInfo
  );
  const userListings = listings.filter(
    (item) =>
      item.hostemail === session?.user?.email ||
      item.hostname === session?.user?.name
  );

  const [listingInProccess, setListingInProgress] = useState<FormState | null>(
    null
  );
  const inProcessData =
    !listingInProccess?.images &&
    !listingInProccess?.title &&
    !listingInProccess?.price;

  useEffect(() => {
    dispath(getAllListings() as any);
  }, [dispath]);

  useLayoutEffect(() => {
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

  console.log(isLoading, "isLoading");

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
        {!listingInProccess && !userListings.length && (
          <Link href="/manage/listings/create" className={styles.empty_page}>
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
          (inProcessData ? (
            <div className={styles.listing_in_progress}>
              <Link href="/manage/listings/create">
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

        {userListings?.map((item) => (
          <ListingCard
            isManagable
            id={item.id}
            key={item.id}
            price={item.price}
            title={item.title}
            images={item.images}
            guests={item.guests}
            location={item.address}
            description={item.aboutPlace}
            typeOfPlace={item.typeOfPlace?.type_name}
            allowPets={item.additionalDetails?.pets}
            accessible={item.additionalDetails?.accesable}
          />
        ))}
      </section>
    </div>
  );
};
