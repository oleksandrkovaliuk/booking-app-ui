"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Spinner, Tooltip } from "@nextui-org/react";

import { store } from "@/store";
import { getUser } from "@/store/api/endpoints/auth/getUser";
import { useGetCurrentListingQuery } from "@/store/api/endpoints/listings/getCurrentListing";

import { ImagesSection } from "./_components/imagesSection";
import { GoogleMapComponent } from "../googleMap/googleMap";
import { DescriptionSection } from "./_components/descriptionSection";
import { CalendarSection } from "./_components/calendarSection";
import { ReserveListingBlock } from "./_components/reserveListingBlock";

import super_host from "@/assets/medal-of-honor.png";
import super_host_black from "@/assets/medal-of-honor-black.png";
import regular_host from "@/assets/renter.png";

import { formattedAddressComponent } from "@/helpers/address/formattedAddressVariants";

import { IShowCaseUser } from "@/_utilities/interfaces";
import { IListingPageComponentProps } from "./_lib/interfaces";

import styles from "./listingPage.module.scss";

export const ListingPageComponent: React.FC<IListingPageComponentProps> = ({
  listing,
  isPublic,
  listingHost,
}) => {
  const { data: session } = useSession();

  const disableReservation = session?.user.email === listingHost.user_email;

  console.log(listing, listingHost, "listing");
  return (
    <div className={styles.listing_container}>
      {!listing || !listingHost.user_email ? (
        <Spinner size="md" color="primary" className={styles.loader} />
      ) : (
        <div className={styles.listing_content}>
          <section className={styles.title_text_content}>
            <h1 className={styles.title}>{listing.title}</h1>
          </section>

          <ImagesSection isPublic={isPublic!} images={listing.images} />

          <section className={styles.sub_title_text_content}>
            <h2 className={styles.sub_title_text}>
              {listing.type?.type_name} in{" "}
              {formattedAddressComponent({
                detailedAddressComponent:
                  listing?.address?.detailedAddressComponent,
                variant: "cityStateCountry",
              })}
            </h2>
            <div className={styles.sub_title_additional_info}>
              <span className={styles.sub_title_additional_info_item}>
                {listing.guests} guests
              </span>
              {listing?.pets_allowed && (
                <span className={styles.sub_title_additional_info_item}>
                  allowed pets
                </span>
              )}

              {listing?.accesable && (
                <span className={styles.sub_title_additional_info_item}>
                  accesable
                </span>
              )}
            </div>
          </section>

          <div className={styles.information_grid_wrap}>
            <div className={styles.left_side_grid}>
              <section className={styles.host_card}>
                <div className={styles.host_img_container}>
                  {listingHost.img_url ? (
                    <Image
                      src={listingHost.img_url!}
                      alt="host_avatar"
                      width={100}
                      height={100}
                      className={styles.host_img}
                    />
                  ) : (
                    <div className={`${styles.host_img} ${styles.no_host_img}`}>
                      {" "}
                      {listingHost.user_name
                        ? listingHost.user_name.split("")[0]
                        : listingHost.user_email?.split("")[0]}
                    </div>
                  )}
                  {listingHost.role === "super_host" && (
                    <Tooltip
                      placement="right"
                      content={"Super host badge"}
                      color="default"
                      size="sm"
                      delay={1000}
                      className="custome_tooltip info"
                    >
                      <div>
                        <Image
                          alt="super_host_badge"
                          src={super_host}
                          className={styles.host_badge}
                          width={100}
                          height={100}
                        />
                      </div>
                    </Tooltip>
                  )}
                </div>
                <div className={styles.host_info}>
                  <h3 className={styles.host_name}>
                    Hosted by{" "}
                    <span>{listingHost.user_name?.split(" ")[0]}</span>
                  </h3>
                  <p className={styles.host_type}>
                    {listingHost.role === "super_host" ? "Super Host" : "Host"}
                  </p>
                </div>
              </section>
              <section className={styles.host_trusted_for}>
                <div className={styles.host_trusted_for_wrap}>
                  {listingHost.role === "super_host" ? (
                    <Image
                      src={super_host_black}
                      alt="super_host_badge"
                      width={100}
                      height={100}
                      className={styles.host_trusted_img}
                    />
                  ) : (
                    <Image
                      alt="host_badge"
                      src={regular_host}
                      className={styles.host_trusted_img}
                      width={100}
                      height={100}
                    />
                  )}

                  <motion.div className={styles.host_trusted_text}>
                    {listingHost.role === "super_host" ? (
                      <>
                        <div className={styles.host_trusted_title}>
                          <span>{listingHost.user_name?.split(" ")[0]}</span> is
                          a super host
                        </div>
                        <p className={styles.host_trusted_description}>
                          Super hosts are seasoned professionals dedicated to
                          providing exceptional service. Their commitment to
                          excellence ensures a welcoming and comfortable
                          experience, where every detail is crafted with care.
                        </p>
                      </>
                    ) : (
                      <>
                        <span className={styles.host_trusted_title}>
                          {listingHost.user_name?.split(" ")[0]} is a trusted
                          host
                        </span>
                        <p className={styles.host_trusted_description}>
                          Hosts are dedicated professionals focused on providing
                          excellent service. Their commitment to quality ensures
                          a welcoming and comfortable experience, with every
                          detail thoughtfully attended to.
                        </p>
                      </>
                    )}
                  </motion.div>
                </div>
              </section>
              <DescriptionSection
                aboutplace={listing.aboutplace}
                placeis={listing.placeis}
                notes={listing.notes}
              />
              <section className={styles.more_details}>
                <div className={styles.more_details_wrap}>
                  <Tooltip
                    placement="top"
                    content={listing.type?.type_description}
                    color="default"
                    size="md"
                    delay={300}
                    className="custome_tooltip info"
                  >
                    <div className={styles.more_details_img}>
                      <Image
                        src={listing?.type?.type_img!}
                        alt="type_img"
                        width={100}
                        height={100}
                      />
                    </div>
                  </Tooltip>
                  <p className={styles.specification_badge}>Type of place</p>
                  <h4 className={styles.more_details_title}>
                    {listing.type?.type_name}
                  </h4>
                </div>
                <div className={styles.more_details_wrap}>
                  <Tooltip
                    placement="top"
                    content="Category"
                    color="default"
                    size="md"
                    delay={300}
                    className="custome_tooltip info"
                  >
                    <div className={styles.more_details_img}>
                      <Image
                        src={listing?.category?.category_icon!}
                        alt="type_img"
                        width={100}
                        height={100}
                      />
                    </div>
                  </Tooltip>
                  <p className={styles.specification_badge}>Category</p>
                  <h5 className={styles.more_details_title}>
                    {listing.category?.category_name}
                  </h5>
                </div>
              </section>

              <CalendarSection
                title={listing?.title}
                disabledDates={listing?.disabled_dates!}
              />
            </div>
            <div className={styles.right_side_grid}>
              <ReserveListingBlock
                disabled={disableReservation}
                price={listing?.price}
                isPublic={isPublic || false}
                guests_limit={listing?.guests}
                disabledDates={listing?.disabled_dates!}
              />
            </div>
          </div>
          <div className={styles.bottom_sections_container}>
            <section className={styles.location}>
              <h6 className={styles.section_title}>Where you’ll be</h6>
              <GoogleMapComponent isOnlyMap cordinates={listing?.cordinates!} />
            </section>
          </div>
        </div>
      )}
    </div>
  );
};
