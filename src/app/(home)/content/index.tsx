"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { skeletonData } from "@/information/data";

import { store } from "@/store";
import {
  requestListingSearch,
  useGetVerifiedListingsQuery,
} from "@/store/api/endpoints/listings/getVerifiedListings";

import { ListingCard } from "@/components/listingCard";
import { SkeletonListingCard } from "@/components/listingCard/components/skeleton";

import { SEARCH_PARAM_KEYS } from "@/layout/header/_lib/enums";
import { CountNights, ParseLocalStorageDates } from "@/helpers/dateManagment";

import styles from "./homeContent.module.scss";
import { ExtractAvailableQueryParams } from "@/helpers/paramsManagment";
import {
  useIsSearchTriggeredApi,
  useIsSearchTriggeredData,
} from "@/app/_lib/context";
import { ErrorHandler } from "@/helpers/errorHandler";
import { useRequestAvailableCategoriesMutation } from "@/store/api/endpoints/listings/getCategories";

export const HomeContent: React.FC = () => {
  const params = useSearchParams();

  const {
    isFetching,
    isLoading,
    data: listings,
  } = useGetVerifiedListingsQuery();
  const [requestAvailableCategories] = useRequestAvailableCategoriesMutation();
  const { isSearchTriggered } = useIsSearchTriggeredData();
  const { setIsSearchTriggered } = useIsSearchTriggeredApi();

  const [countNights, setCountNights] = useState<number | null>(null);

  const requestInitListingSearch = useCallback(async () => {
    try {
      const extractedParams = ExtractAvailableQueryParams(params);
      const { data: res, error } = await store.dispatch(
        requestListingSearch.initiate({
          search_place: extractedParams[SEARCH_PARAM_KEYS.SEARCH_PLACE]
            ? JSON.parse(extractedParams[SEARCH_PARAM_KEYS.SEARCH_PLACE])
            : null,
          search_date: extractedParams[SEARCH_PARAM_KEYS.SEARCH_DATE]
            ? ParseLocalStorageDates(
                extractedParams[SEARCH_PARAM_KEYS.SEARCH_DATE]
              )
            : null,
          search_amountOfGuests: extractedParams[
            SEARCH_PARAM_KEYS.SEARCH_AMOUNT_OF_GUESTS
          ]
            ? JSON.parse(
                extractedParams[SEARCH_PARAM_KEYS.SEARCH_AMOUNT_OF_GUESTS]
              )
            : null,
          search_includePets: extractedParams[
            SEARCH_PARAM_KEYS.SEARCH_INCLUDE_PETS
          ]
            ? JSON.parse(extractedParams[SEARCH_PARAM_KEYS.SEARCH_INCLUDE_PETS])
            : null,
        })
      );

      if (error || !res.length) ErrorHandler(error as Error);

      await requestAvailableCategories(res!);

      setIsSearchTriggered(true);
    } catch (error) {
      return;
    }
  }, [params, requestAvailableCategories, setIsSearchTriggered]);

  useLayoutEffect(() => {
    const extractedParams = ExtractAvailableQueryParams(params);

    if (Object.keys(extractedParams).length) {
      if (extractedParams[SEARCH_PARAM_KEYS.SEARCH_DATE] && isSearchTriggered) {
        setCountNights(
          CountNights(
            ParseLocalStorageDates(
              extractedParams[SEARCH_PARAM_KEYS.SEARCH_DATE]
            ).start,
            ParseLocalStorageDates(
              extractedParams[SEARCH_PARAM_KEYS.SEARCH_DATE]
            ).end
          )
        );
      }

      // if (!isSearchTriggered) {
      //   requestInitListingSearch();
      // }
    }
  }, [isSearchTriggered, params, requestInitListingSearch]);

  return (
    <div className={styles.home_container}>
      <div className={styles.listings_container}>
        {isFetching || isLoading || !listings?.length
          ? skeletonData.map((item) => (
              <SkeletonListingCard key={item} item={item} size="sm" />
            ))
          : listings?.map((listing, i) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 * i, ease: "easeInOut" }}
              >
                <ListingCard
                  isPublic
                  id={listing.id!}
                  isManagable={false}
                  title={listing.title}
                  price={listing.price}
                  guests={listing.guests}
                  images={listing.images}
                  address={listing.address}
                  accesable={listing.accesable}
                  calculated_nights={countNights}
                  aboutplace={listing.description}
                  pets_allowed={listing.pets_allowed}
                />
              </motion.div>
            ))}
      </div>
    </div>
  );
};
