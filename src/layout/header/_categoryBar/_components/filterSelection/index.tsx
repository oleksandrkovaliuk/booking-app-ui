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
import { setListings } from "@/store/slices/listings/listingSearchResponseSlice";
import { useRequestListingSearchMutation } from "@/store/api/endpoints/listings/getVerifiedListings";
import { useRequestAvailableCategoriesMutation } from "@/store/api/endpoints/listings/getCategories";

import { OptionSelection } from "./content/optionSelection";
import { TypeOfPlaceSelection } from "./content/typeOfPlaceSelection";
import { PriceRangeSelection } from "./content/priceRangeSelection";

import { FilterIcon } from "@/svgs/FilterIcon";

import {
  AssignNewQueryParams,
  ExtractAvailableQueryParams,
} from "@/helpers/paramsManagment";

import { ParseLocalStorageDates } from "@/helpers/dateManagment";

import { SEARCH_PARAM_KEYS } from "@/layout/header/_lib/enums";
import { getSearchSelection } from "@/layout/header/_lib/getSearchSelections";

import styles from "./filterSelection.module.scss";

export const FilterSelection: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const params = useSearchParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { listings } = useSelector((state) => state.listingSearchResponse);

  const [_, { isLoading: isLoadingCategories }] =
    useRequestAvailableCategoriesMutation();
  const [requestListingSearch] = useRequestListingSearchMutation();

  const [previewCountOfResults, setPreviewCountOfResults] = useState<
    number | null
  >(null);
  const [isListingRequested, setIsListingRequested] = useState<boolean>(false);

  const previewNumberOfResults = useCallback(() => {
    const applyiedFilters = ExtractAvailableQueryParams(params);

    if (!applyiedFilters || !listings!?.length) return;
    const {
      [SEARCH_PARAM_KEYS.SEARCH_PRICE_RANGE]: priceRange,
      [SEARCH_PARAM_KEYS.SEARCH_TYPE_OF_PLACE]: typeOfPlace,
      [SEARCH_PARAM_KEYS.SEARCH_ACCESABLE]: accesable,
      [SEARCH_PARAM_KEYS.SEARCH_SHARED_ROOM]: sharedRoom,
    } = applyiedFilters;

    const parsedPriceRange = priceRange ? JSON.parse(priceRange) : null;
    const parsedTypeOfPlace = typeOfPlace ? JSON.parse(typeOfPlace) : null;
    const parsedAccesableOption = accesable ? JSON.parse(accesable) : null;
    const parsedSharedRoomOption = sharedRoom ? JSON.parse(sharedRoom) : null;

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
  }, [listings, params]);

  const handleClearFilterSelection = async () => {
    try {
      setIsListingRequested(true);

      const searchSelection = getSearchSelection(params, SEARCH_PARAM_KEYS);

      AssignNewQueryParams({
        updatedParams: {
          [SEARCH_PARAM_KEYS.SEARCH_PRICE_RANGE]: null,
          [SEARCH_PARAM_KEYS.SEARCH_TYPE_OF_PLACE]: null,
          [SEARCH_PARAM_KEYS.SEARCH_ACCESABLE]: null,
          [SEARCH_PARAM_KEYS.SEARCH_SHARED_ROOM]: null,
          [SEARCH_PARAM_KEYS.SEARCH_CATEGORY_ID]: null,
        },
        params,
        router,
        pathname,
      });

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
        options: ExtractAvailableQueryParams(params),
      });

      if (error) throw new Error();

      dispatch(setFetch(true));
      dispatch(setListings(res!));
      dispatch(setIsSearchTriggered(false));

      setIsListingRequested(false);
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

      const availableSearchOptions = ExtractAvailableQueryParams(params);
      const {
        [SEARCH_PARAM_KEYS.SEARCH_PRICE_RANGE]: priceRange,
        [SEARCH_PARAM_KEYS.SEARCH_TYPE_OF_PLACE]: typeOfPlace,
        [SEARCH_PARAM_KEYS.SEARCH_ACCESABLE]: accesable,
        [SEARCH_PARAM_KEYS.SEARCH_SHARED_ROOM]: sharedRoom,
      } = availableSearchOptions;

      const { data: res, error } = await requestListingSearch({
        search_place: availableSearchOptions[SEARCH_PARAM_KEYS.SEARCH_PLACE]
          ? JSON.parse(availableSearchOptions[SEARCH_PARAM_KEYS.SEARCH_PLACE])
          : null,
        search_date: availableSearchOptions[SEARCH_PARAM_KEYS.SEARCH_DATE]
          ? ParseLocalStorageDates(
              availableSearchOptions[SEARCH_PARAM_KEYS.SEARCH_DATE]
            )
          : null,
        search_amountOfGuests: availableSearchOptions[
          SEARCH_PARAM_KEYS.SEARCH_AMOUNT_OF_GUESTS
        ]
          ? JSON.parse(
              availableSearchOptions[SEARCH_PARAM_KEYS.SEARCH_AMOUNT_OF_GUESTS]
            )
          : null,
        search_includePets: availableSearchOptions[
          SEARCH_PARAM_KEYS.SEARCH_INCLUDE_PETS
        ]
          ? JSON.parse(
              availableSearchOptions[SEARCH_PARAM_KEYS.SEARCH_INCLUDE_PETS]
            )
          : null,
        search_category_id: null,

        returnFiltered: true,
        accesable: accesable ? JSON.parse(accesable) : null,
        shared_room: sharedRoom ? JSON.parse(sharedRoom) : null,
        price_range: priceRange ? JSON.parse(priceRange) : null,
        type_of_place: typeOfPlace ? JSON.parse(typeOfPlace) : null,

        options: ExtractAvailableQueryParams(params),
      });

      if (!res && error) throw new Error();

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
