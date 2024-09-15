import React, { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Spinner } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useRequestListingSearchMutation } from "@/store/api/endpoints/listings/getVerifiedListings";
import { useRequestAvailableCategoriesMutation } from "@/store/api/endpoints/listings/getCategories";

import { Search } from "@/svgs/Search";

import { DatesSelectionComponent } from "./_components/datesSelection";
import { GuestsSelectionComponent } from "./_components/guestSelection";
import { RegionSelectionComponent } from "./_components/regionSelection";

import { ErrorHandler } from "@/helpers/errorHandler";
import { ParseLocalStorageDates } from "@/helpers/dateManagment";
import { AssignNewQueryParams } from "@/helpers/paramsManagment";
import { getSearchSelection } from "../_lib/getSearchSelections";
import {
  TriggeredSelectionApi,
  TriggeredSelectionData,
  useStaysButtonContextApi,
} from "../_lib/context/context";

import { SEARCH_PARAM_KEYS } from "../_lib/enums";
import { SearchFormBarProps } from "../_lib/types";
import { TypesOfSelections } from "@/_utilities/enums";
import { HandlePopUpMenuOpening } from "./_components/type";
import { useIsSearchTriggeredApi } from "@/app/_lib/context";

import styles from "./search_form_bar.module.scss";

export const SearchFormBar: React.FC<SearchFormBarProps> = ({
  isMobile,
  trackScrolled,
  onCloseCallBack,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const searchBarRef = useRef<HTMLFormElement | null>(null);

  const { setIsCategoryChanged } = useStaysButtonContextApi();
  const { setIsSearchTriggered } = useIsSearchTriggeredApi();

  const [requestListingSearch, { isLoading }] =
    useRequestListingSearchMutation();
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
      const searchSelection = getSearchSelection(params, SEARCH_PARAM_KEYS);

      if (Object.keys(searchSelection).length) {
        const { data: res, error } = await requestListingSearch({
          search_place: searchSelection[SEARCH_PARAM_KEYS.SEARCH_PLACE]
            ? JSON.parse(searchSelection[SEARCH_PARAM_KEYS.SEARCH_PLACE])
            : null,
          search_date: searchSelection[SEARCH_PARAM_KEYS.SEARCH_DATE]
            ? ParseLocalStorageDates(
                searchSelection[SEARCH_PARAM_KEYS.SEARCH_DATE]
              )
            : null,
          search_amountOfGuests: searchSelection[
            SEARCH_PARAM_KEYS.SEARCH_AMOUNT_OF_GUESTS
          ]
            ? JSON.parse(
                searchSelection[SEARCH_PARAM_KEYS.SEARCH_AMOUNT_OF_GUESTS]
              )
            : null,
          search_includePets: searchSelection[
            SEARCH_PARAM_KEYS.SEARCH_INCLUDE_PETS
          ]
            ? JSON.parse(searchSelection[SEARCH_PARAM_KEYS.SEARCH_INCLUDE_PETS])
            : null,
        });

        if (error || !res.length) ErrorHandler(error as Error);

        await requestAvailableCategories(res!);

        AssignNewQueryParams({
          updatedParams: {
            [SEARCH_PARAM_KEYS.SEARCH_CATEGORY_ID]: null,
          },
          pathname,
          params,
          router,
        });

        setIsSearchTriggered(true);
        setTriggeredSelection(TypesOfSelections.UNSELECTED);
        onCloseCallBack && onCloseCallBack();
      }
    } catch (error) {
      AssignNewQueryParams({
        updatedParams: { [SEARCH_PARAM_KEYS.SEARCH_CATEGORY_ID]: null },
        pathname,
        params,
        router,
      });
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
          data-is-mobile={isMobile}
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
