"use client";

import { motion } from "framer-motion";
import { useGetUserListingsQuery } from "@/store/api/endpoints/listings/getUserListings";
import { Skeleton, Tooltip } from "@nextui-org/react";
import Link from "next/link";

import styles from "./listings.module.scss";
import { appearAnimation, motion_transition } from "../../_components/consts";
import { NotFoundIcon } from "@/svgs/NotFoundIcon";
import { IFormState } from "../../_components/type";
import { ListingCard } from "@/components/listingCard";
import { StatusBadge } from "@/components/statusBadge";

export const ListingsList = () => {
  const { data: listings, isLoading } = useGetUserListingsQuery();

  const date = localStorage.getItem("startingDate");
  const category = localStorage.getItem("category");
  const address = localStorage.getItem("address") as
    | IFormState["address"]
    | null;
  const title = localStorage.getItem("title");
  const images = localStorage.getItem("images");
  const price = localStorage.getItem("price");

  const isListingInProgress = !!category;

  const isDataInProccess =
    !localStorage.getItem("images") &&
    !localStorage.getItem("title") &&
    !localStorage.getItem("price");

  return (
    <section className={styles.listings_container}>
      {!listings?.length && !isLoading && !isListingInProgress && (
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
            className="custome_tooltip black"
          >
            <motion.div {...appearAnimation} transition={motion_transition}>
              <NotFoundIcon className={styles.not_found_icon} />
            </motion.div>
          </Tooltip>
        </Link>
      )}

      {isListingInProgress &&
        !isLoading &&
        (isDataInProccess ? (
          <div className={styles.listing_in_progress}>
            <Link
              href={!isLoading ? "/manage/listings/create" : "#"}
              prefetch={true}
            >
              <Skeleton className={styles.skeleton}>
                <div className={styles.listing_in_progress_img}></div>
              </Skeleton>
              <p className={styles.listing_in_progress_text}>
                You made the last changes on <span>{date}</span> for the listing
                located at{" "}
                {!!address && (
                  <span>{JSON.parse(address?.formattedAddress)}</span>
                )}
              </p>
              <StatusBadge status="In progress" color="#ffa836" />
            </Link>
          </div>
        ) : (
          <ListingCard
            images={JSON.parse(images || "")}
            title={JSON.parse(title || "")}
            price={JSON.parse(price || "")}
            isInProccess
          />
        ))}

      {listings?.map((item) => (
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
  );
};
