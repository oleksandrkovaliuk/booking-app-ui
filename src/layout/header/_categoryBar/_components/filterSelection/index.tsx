import React, { useCallback, useEffect, useState } from "react";

import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useSelector } from "@/store";
import {
  setFetch,
  setIsSearchTriggered,
} from "@/store/slices/listings/isSearchTriggeredSlice";
import { setSearchSelection } from "@/store/slices/search/searchSelectionSlice";
import { setListings } from "@/store/slices/listings/listingSearchResponseSlice";
import { useRequestListingSearchMutation } from "@/store/api/endpoints/listings/getVerifiedListings";
import { useRequestAvailableCategoriesMutation } from "@/store/api/endpoints/listings/getCategories";

import { OptionSelection } from "./content/optionSelection";
import { TypeOfPlaceSelection } from "./content/typeOfPlaceSelection";
import { PriceRangeSelection } from "./content/priceRangeSelection";

import { FilterIcon } from "@/svgs/FilterIcon";

import { CreateNewQueryParams } from "@/helpers/paramsManagment";

import { ParseLocalStorageDates } from "@/helpers/dateManagment";

import { searchParamsKeys } from "@/layout/header/_lib/enums";

import styles from "./filterSelection.module.scss";

export const FilterSelection: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const params = useSearchParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    search_place,
    search_date,
    search_amountOfGuests,
    search_includePets,

    search_accesable,
    search_shared_room,
    search_price_range,
    search_type_of_place,
  } = useSelector((state) => state.searchSelection);
  const { listings } = useSelector((state) => state.listingSearchResponse);

  const [_, { isLoading: isLoadingCategories }] =
    useRequestAvailableCategoriesMutation();
  const [requestListingSearch] = useRequestListingSearchMutation();

  const [previewCountOfResults, setPreviewCountOfResults] = useState<
    number | null
  >(null);
  const [isListingRequested, setIsListingRequested] = useState<boolean>(false);

  const previewNumberOfResults = useCallback(() => {
    const parsedPriceRange = JSON.parse(search_price_range || "null");
    const parsedTypeOfPlace = JSON.parse(search_type_of_place || "null");
    const parsedAccesableOption = JSON.parse(search_accesable || "false");
    const parsedSharedRoomOption = JSON.parse(search_shared_room || "false");

    setPreviewCountOfResults(
      listings!?.filter((listing) => {
        const matchedPriceRange = parsedPriceRange
          ? Number(listing.price) >= Number(parsedPriceRange![0]) &&
            Number(listing.price) <= Number(parsedPriceRange![1])
          : true;

        const matchedTypeOfPlace =
          !parsedSharedRoomOption && parsedTypeOfPlace
            ? parsedTypeOfPlace === listing.type!.id
            : parsedSharedRoomOption
            ? listing.type?.type_name === "A shared room"
            : true;

        const matchedAccesableOption = parsedAccesableOption
          ? listing.accesable === parsedAccesableOption
          : true;

        return (
          matchedPriceRange && matchedTypeOfPlace && matchedAccesableOption
        );
      }).length
    );
  }, [
    listings,
    search_accesable,
    search_price_range,
    search_shared_room,
    search_type_of_place,
  ]);

  const handleClearFilterSelection = async () => {
    try {
      setIsListingRequested(true);

      const updatedParams = CreateNewQueryParams({
        updatedParams: {
          [searchParamsKeys.SEARCH_PRICE_RANGE]: null,
          [searchParamsKeys.SEARCH_TYPE_OF_PLACE]: null,
          [searchParamsKeys.SEARCH_ACCESABLE]: null,
          [searchParamsKeys.SEARCH_SHARED_ROOM]: null,
          [searchParamsKeys.SEARCH_CATEGORY_ID]: null,
        },
        params,
      });

      dispatch(
        setSearchSelection({
          [searchParamsKeys.SEARCH_ACCESABLE]: null,
          [searchParamsKeys.SEARCH_SHARED_ROOM]: null,
          [searchParamsKeys.SEARCH_PRICE_RANGE]: null,
          [searchParamsKeys.SEARCH_TYPE_OF_PLACE]: null,
          [searchParamsKeys.SEARCH_CATEGORY_ID]: null,
        })
      );

      router.replace(`${pathname}?${updatedParams}`, {
        scroll: false,
      });

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
        options: Object.fromEntries(params.entries()),
      });

      if (error) throw new Error();

      dispatch(setFetch(true));
      dispatch(setListings(res!));
      dispatch(setIsSearchTriggered(false));

      setIsListingRequested(false);
      onClose();
    } catch (error) {
      setIsListingRequested(false);
      toast(
        `We couldn't clear your filter selection. Try to change your search selections.`,
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

  const handleApplyFilterSelections = async () => {
    try {
      setIsListingRequested(true);

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

        returnFiltered: true,
        accesable: search_accesable ? JSON.parse(search_accesable) : null,
        shared_room: search_shared_room ? JSON.parse(search_shared_room) : null,
        price_range: search_price_range ? JSON.parse(search_price_range) : null,
        type_of_place: search_type_of_place
          ? JSON.parse(search_type_of_place)
          : null,

        options: Object.fromEntries(params.entries()),
      });

      if (!res && error) throw new Error();

      const updatedQueryParams = CreateNewQueryParams({
        updatedParams: {
          [searchParamsKeys.SEARCH_ACCESABLE]: search_accesable!,
          [searchParamsKeys.SEARCH_SHARED_ROOM]: search_shared_room!,
          [searchParamsKeys.SEARCH_PRICE_RANGE]: search_price_range
            ? search_price_range
            : null,
          [searchParamsKeys.SEARCH_TYPE_OF_PLACE]: search_type_of_place
            ? search_type_of_place
            : null,
        },
        params,
      });

      router.replace(`${pathname}?${updatedQueryParams}`, {
        scroll: false,
      });

      dispatch(setListings(res!));
      dispatch(setFetch(true));
      dispatch(setIsSearchTriggered(false));

      setIsListingRequested(false);
      onClose();
    } catch (error) {
      setIsListingRequested(false);
      toast(
        `We couldn't filter your search. Please try again or chose another options.`,
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

  useEffect(() => {
    previewNumberOfResults();
  }, [previewNumberOfResults]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        backdrop="opaque"
        size="2xl"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: 20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent className={styles.modal_content}>
          <ModalHeader className={styles.modal_header}>Filter</ModalHeader>
          <div className={styles.modal_filter_container}>
            <section className={styles.filter_section}>
              <span className={styles.filter_section_title}>Type of place</span>
              <TypeOfPlaceSelection />
            </section>
            <section className={styles.filter_section}>
              <span className={styles.filter_section_title}>Price range</span>
              <p className={styles.filter_section_description}>
                Nightly prices excluding fees and taxes
              </p>

              <PriceRangeSelection />
            </section>
            <section className={styles.filter_section}>
              <span className={styles.filter_section_title}>Options</span>
              <OptionSelection />
            </section>
          </div>
          <ModalFooter className={styles.modal_footer}>
            <Button
              size="md"
              variant="light"
              isDisabled={!listings?.length}
              onClick={handleClearFilterSelection}
              className={styles.clear_btn}
            >
              {isLoadingCategories || isListingRequested ? (
                <Spinner size="sm" color="default" />
              ) : (
                "Clear all"
              )}
            </Button>
            <Button
              size="md"
              className={styles.apply_btn}
              isDisabled={previewCountOfResults === 0 || !listings!?.length}
              onClick={handleApplyFilterSelections}
            >
              {!listings?.length || isListingRequested ? (
                <Spinner size="sm" color="default" />
              ) : (
                `Show ${!listings!?.length ? 0 : previewCountOfResults} results`
              )}{" "}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Button
        className={styles.filter_btn}
        size="md"
        onClick={onOpen}
        data-opened={isOpen}
      >
        <FilterIcon />
        Filter
      </Button>
    </>
  );
};
