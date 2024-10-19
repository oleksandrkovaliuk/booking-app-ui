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
import { isWidthHandlerSelector } from "@/store/selectors/isWidthHandler";
import { searchSelectionSelector } from "@/store/selectors/searchSelection";
import { setSearchSelection } from "@/store/slices/search/searchSelectionSlice";
import { useGetListingsCategoriesQuery } from "@/store/api/endpoints/listings/getCategories";

import { OptionSelection } from "./content/optionSelection";
import { TypeOfPlaceSelection } from "./content/typeOfPlaceSelection";
import { PriceRangeSelection } from "./content/priceRangeSelection";

import { FilterIcon } from "@/svgs/FilterIcon";

import { CreateNewQueryParams } from "@/helpers/paramsManagment";

import { searchParamsKeys } from "@/layout/header/_lib/enums";

import styles from "./filterSelection.module.scss";

export const FilterSelection: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const params = useSearchParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    search_category_id,

    filter_accesable,
    filter_shared_room,
    filter_price_range,
    filter_type_of_place,
  } = useSelector(searchSelectionSelector());
  const { mobile } = useSelector(isWidthHandlerSelector);

  const { listings } = useSelector((state) => state.listingSearchResponse);

  const { isLoading } = useGetListingsCategoriesQuery({
    options: Object.fromEntries(params.entries()),
  });

  const [previewCountOfResults, setPreviewCountOfResults] = useState<
    number | null
  >(null);

  const [countOfApliedFilters, setCountOfAppliedFilters] = useState<number>(0);
  const [isListingRequested, setIsListingRequested] = useState<boolean>(false);

  const previewNumberOfResults = useCallback(() => {
    const parsedCategorySelection = JSON.parse(search_category_id || "null");
    const parsedPriceRange = JSON.parse(filter_price_range || "null");
    const parsedTypeOfPlace = JSON.parse(filter_type_of_place || "null");
    const parsedAccesableOption = JSON.parse(filter_accesable || "false");
    const parsedSharedRoomOption = JSON.parse(filter_shared_room || "false");

    setPreviewCountOfResults(
      listings!?.filter((listing) => {
        const matchWithSelectedCategory = parsedCategorySelection
          ? listing.category?.id === parsedCategorySelection
          : true;
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
          matchWithSelectedCategory &&
          matchedPriceRange &&
          matchedTypeOfPlace &&
          matchedAccesableOption
        );
      }).length
    );
  }, [
    search_category_id,
    filter_price_range,
    filter_type_of_place,
    filter_accesable,
    filter_shared_room,
    listings,
  ]);

  const handleClearFilterSelection = async () => {
    try {
      setIsListingRequested(true);

      const updatedParams = CreateNewQueryParams({
        updatedParams: {
          [searchParamsKeys.FILTER_ACCESABLE]: null,
          [searchParamsKeys.SEARCH_CATEGORY_ID]: null,
          [searchParamsKeys.FILTER_PRICE_RANGE]: null,
          [searchParamsKeys.FILTER_SHARED_ROOM]: null,
          [searchParamsKeys.FILTER_TYPE_OF_PLACE]: null,
        },
        params,
      });

      dispatch(
        setSearchSelection({
          [searchParamsKeys.FILTER_ACCESABLE]: null,
          [searchParamsKeys.SEARCH_CATEGORY_ID]: null,
          [searchParamsKeys.FILTER_SHARED_ROOM]: null,
          [searchParamsKeys.FILTER_PRICE_RANGE]: null,
          [searchParamsKeys.FILTER_TYPE_OF_PLACE]: null,
        })
      );

      router.replace(`${pathname}?${updatedParams}`, {
        scroll: false,
      });

      dispatch(setFetch(true));
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
      const updatedQueryParams = CreateNewQueryParams({
        updatedParams: {
          [searchParamsKeys.FILTER_ACCESABLE]: filter_accesable!,
          [searchParamsKeys.FILTER_SHARED_ROOM]: filter_shared_room!,
          [searchParamsKeys.FILTER_PRICE_RANGE]: filter_price_range
            ? filter_price_range
            : null,
          [searchParamsKeys.FILTER_TYPE_OF_PLACE]: filter_type_of_place
            ? filter_type_of_place
            : null,
        },
        params,
      });

      router.replace(`${pathname}?${updatedQueryParams}`, {
        scroll: false,
      });

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

  useEffect(() => {
    const existingFilterParams = Array.from(
      Object.keys(Object.fromEntries(params.entries()))
    );
    if (existingFilterParams.length >= 1) {
      setCountOfAppliedFilters(
        existingFilterParams.filter((key) => key.startsWith("filter_")).length
      );
    } else {
      setCountOfAppliedFilters(0);
    }
  }, [params]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        backdrop="opaque"
        size={mobile ? "full" : "2xl"}
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
              {isLoading || isListingRequested ? (
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

      <div role="button" className={styles.filter_btn_container}>
        {countOfApliedFilters > 0 && (
          <div className={styles.count_of_aplied_filters_badge}>
            {countOfApliedFilters}
          </div>
        )}
        <Button
          size="md"
          aria-label="listign_filters"
          className={styles.filter_btn}
          onClick={onOpen}
          data-opened={isOpen}
        >
          <FilterIcon className={styles.filter_icon} />
          Filter
        </Button>
      </div>
    </>
  );
};
