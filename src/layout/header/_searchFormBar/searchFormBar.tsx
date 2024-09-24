import React, { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Spinner, useSelect } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useSelector } from "@/store";
import {
  setFetch,
  setIsSearchTriggered,
} from "@/store/slices/listings/isSearchTriggeredSlice";
import {
  useGetVerifiedListingByParamsQuery,
  useRequestListingSearchMutation,
} from "@/store/api/endpoints/listings/getVerifiedListings";
import { isWidthHandlerSelector } from "@/store/selectors/isWidthHandler";
import { searchSelectionSelector } from "@/store/selectors/searchSelection";
import { setListings } from "@/store/slices/listings/listingSearchResponseSlice";
import { useRequestAvailableCategoriesMutation } from "@/store/api/endpoints/listings/getCategories";

import { Search } from "@/svgs/Search";

import { DatesSelectionComponent } from "./_components/datesSelection";
import { GuestsSelectionComponent } from "./_components/guestSelection";
import { RegionSelectionComponent } from "./_components/regionSelection";

import { ParseLocalStorageDates } from "@/helpers/dateManagment";
import { CreateNewQueryParams } from "@/helpers/paramsManagment";

import {
  TriggeredSelectionApi,
  TriggeredSelectionData,
  useStaysButtonContextApi,
} from "../_lib/context/context";

import { searchParamsKeys } from "../_lib/enums";
import { SearchFormBarProps } from "../_lib/types";
import { TypesOfSelections } from "@/_utilities/enums";
import { HandlePopUpMenuOpening } from "./_components/type";

import styles from "./search_form_bar.module.scss";

export const SearchFormBar: React.FC<SearchFormBarProps> = ({
  trackScrolled,
  onCloseCallBack,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const params = useSearchParams();

  const searchBarRef = useRef<HTMLFormElement | null>(null);

  const {
    search_place,
    search_date,
    search_amountOfGuests,
    search_includePets,
    search_category_id,
    filter_accesable,
    filter_shared_room,
    filter_price_range,
    filter_type_of_place,
  } = useSelector(searchSelectionSelector);
  const { isWidthEqualTo } = useSelector(isWidthHandlerSelector);

  const { isLoading } = useGetVerifiedListingByParamsQuery({
    options: Object.fromEntries(params.entries()),
  });
  const { setIsCategoryChanged } = useStaysButtonContextApi();
  const [requestListingSearch] = useRequestListingSearchMutation();
  const [requestAvailableCategories] = useRequestAvailableCategoriesMutation();

  const [triggeredSelection, setTriggeredSelection] =
    useState<TypesOfSelections>(TypesOfSelections.UNSELECTED);

  const triggeredSelectionApi = useMemo(
    () => ({
      setTriggeredSelection,
    }),
    [setTriggeredSelection]
  );

  const triggeredSelectionData = useMemo(() => {
    return {
      triggeredSelection,
    };
  }, [triggeredSelection]);

  // CONDITIONS

  const handleClearAllTriggeredSelections = () => {
    setTriggeredSelection(TypesOfSelections.UNSELECTED);
  };

  const handlePopUpMenuOpening: HandlePopUpMenuOpening = useMemo(() => {
    return (e: React.MouseEvent, type: TypesOfSelections) => {
      e.preventDefault();
      setIsCategoryChanged(false);
      setTriggeredSelection(type);
    };
  }, [setIsCategoryChanged, setTriggeredSelection]);

  const requestSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: res, error } = await requestListingSearch({
        search_place: search_place ? JSON.parse(search_place) : null,
        search_date: search_date ? ParseLocalStorageDates(search_date) : null,
        search_amountOfGuests: search_amountOfGuests
          ? JSON.parse(search_amountOfGuests)
          : null,
        search_includePets: search_includePets
          ? JSON.parse(search_includePets)
          : null,
        search_category_id: null,

        returnFiltered:
          filter_accesable ||
          filter_shared_room ||
          filter_price_range ||
          filter_type_of_place
            ? true
            : false,
        accesable: filter_accesable ? JSON.parse(filter_accesable) : null,
        shared_room: filter_shared_room ? JSON.parse(filter_shared_room) : null,
        price_range: filter_price_range ? JSON.parse(filter_price_range) : null,
        type_of_place: filter_type_of_place
          ? JSON.parse(filter_type_of_place)
          : null,

        options: Object.fromEntries(params.entries()),
      });

      if (error || !res?.length) throw new Error();

      const updatedParams = CreateNewQueryParams({
        updatedParams: {
          [searchParamsKeys.SEARCH_PLACE]: search_place ? search_place : null,
          [searchParamsKeys.SEARCH_DATE]: search_date ? search_date : null,
          [searchParamsKeys.SEARCH_AMOUNT_OF_GUESTS]: search_amountOfGuests
            ? search_amountOfGuests
            : null,
          [searchParamsKeys.SEARCH_INCLUDE_PETS]: search_includePets
            ? search_includePets
            : null,
          [searchParamsKeys.SEARCH_CATEGORY_ID]: search_category_id
            ? search_category_id
            : null,
          [searchParamsKeys.FILTER_ACCESABLE]: filter_accesable
            ? filter_accesable
            : null,
          [searchParamsKeys.FILTER_SHARED_ROOM]: filter_shared_room
            ? filter_shared_room
            : null,
          [searchParamsKeys.FILTER_PRICE_RANGE]: filter_price_range
            ? filter_price_range
            : null,
          [searchParamsKeys.FILTER_TYPE_OF_PLACE]: filter_type_of_place
            ? filter_type_of_place
            : null,
        },
        params,
      });

      router.replace(`${pathname}?${updatedParams}`, {
        scroll: false,
      });

      requestAvailableCategories(res!);

      dispatch(setListings(res!));
      dispatch(setFetch(true));
      dispatch(setIsSearchTriggered(true));

      setTriggeredSelection(TypesOfSelections.UNSELECTED);
      onCloseCallBack && onCloseCallBack();
    } catch (error) {
      toast(
        "🫣 We apologize. But we couldn't find any listings by your request.",
        {
          position: "top-center",
          action: {
            label: "Close",
            onClick: () => {},
          },
        }
      );
    }
  };

  return (
    <TriggeredSelectionData.Provider value={triggeredSelectionData}>
      <TriggeredSelectionApi.Provider value={triggeredSelectionApi}>
        {triggeredSelection !== TypesOfSelections.UNSELECTED && (
          <button
            className={styles.header_active_background}
            onClick={handleClearAllTriggeredSelections}
          />
        )}
        <motion.form
          ref={searchBarRef}
          className={styles.search_bar_container}
          initial={{ marginTop: "64px" }}
          animate={trackScrolled ? { marginTop: "0" } : { marginTop: "64px" }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          data-triggered={triggeredSelection !== ""}
          data-is-mobile={isWidthEqualTo.tablet}
        >
          <RegionSelectionComponent
            searchBarRef={searchBarRef}
            handlePopUpMenuOpening={handlePopUpMenuOpening}
          />

          <DatesSelectionComponent
            searchBarRef={searchBarRef}
            handlePopUpMenuOpening={handlePopUpMenuOpening}
          />

          <GuestsSelectionComponent
            searchBarRef={searchBarRef}
            handlePopUpMenuOpening={handlePopUpMenuOpening}
          />

          <motion.button
            type="submit"
            className={styles.search_bar_button}
            data-triggered={triggeredSelection !== ""}
            animate={
              triggeredSelection !== ""
                ? { maxWidth: "110px", gap: "7.5px" }
                : { maxWidth: "50px", gap: "15px" }
            }
            onClick={
              triggeredSelection !== ""
                ? requestSearch
                : (e) => {
                    e.preventDefault();
                    setTriggeredSelection(TypesOfSelections.UNSELECTED);
                  }
            }
          >
            {isLoading ? (
              <Spinner size="sm" color="white" />
            ) : (
              <Search className={styles.search_icon} />
            )}

            <span className={styles.search_text}>search</span>
          </motion.button>
        </motion.form>
      </TriggeredSelectionApi.Provider>
    </TriggeredSelectionData.Provider>
  );
};
