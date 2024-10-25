import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Tooltip } from "@nextui-org/react";
import { usePathname, useSearchParams } from "next/navigation";

import { useSelector } from "@/store";
import { searchSelectionSelector } from "@/store/selectors/searchSelection";
import { setSearchSelection } from "@/store/slices/search/searchSelectionSlice";

import { Counter } from "@/components/counter";
import { DateInputsModal } from "@/components/dateInputsModal";

import { CountNights } from "@/helpers/dateManagment";
import { CalculatePriceIncludingTax } from "@/helpers/priceManagment";

import { searchParamsKeys } from "@/layout/header/_lib/enums";
import { IReserveListingBlockProps } from "../../_lib/interfaces";

import styles from "./reserveListing.module.scss";
import "./additionalStyles.scss";

export const ReserveListingBlock: React.FC<IReserveListingBlockProps> = ({
  price,
  disabled,
  isPublic,
  guests_limit,
  disabledDates,
}) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const params = useSearchParams();

  const { parsedSearchDate } = useSelector(searchSelectionSelector(params));

  const [guestsAmount, setGuestsAmount] = useState<number>(() => {
    const guests = JSON.parse(
      params.get(searchParamsKeys.SEARCH_AMOUNT_OF_GUESTS) || "1"
    );

    dispatch(
      setSearchSelection({
        [searchParamsKeys.SEARCH_AMOUNT_OF_GUESTS]: guests,
      })
    );

    return guests;
  });

  const [inputSelection, setInputSelection] = useState<
    "checkIn" | "checkOut" | "guests" | "none"
  >("none");

  // CONSTANTS

  const isDateIncludingUnavailableDates = disabledDates.some((date) => {
    const disabled = new Date(date.year, date.month - 1, date.day);
    const start = new Date(
      parsedSearchDate.start.year,
      parsedSearchDate.start.month - 1,
      parsedSearchDate.start.day
    );
    const end = new Date(
      parsedSearchDate.end.year,
      parsedSearchDate.end.month - 1,
      parsedSearchDate.end.day
    );

    return disabled >= start && disabled <= end;
  });

  const calculationOfPrice =
    Number(Number(price).toLocaleString().split(",").join("")) *
    CountNights(parsedSearchDate.start, parsedSearchDate.end);

  const reserveRedirectionLink =
    isDateIncludingUnavailableDates || disabled
      ? "#"
      : `${pathname}/reserve?${params}&calculation=${calculationOfPrice}&guests_limit=${guests_limit}`;

  useEffect(() => {
    dispatch(
      setSearchSelection({
        [searchParamsKeys.SEARCH_AMOUNT_OF_GUESTS]: guestsAmount
          ? JSON.stringify(guestsAmount)
          : null,
      })
    );
  }, [guestsAmount, dispatch]);

  return (
    <div className={styles.reserve_listing_container}>
      <div className={styles.reserve_listing_main_block}>
        <div className={styles.price_block}>
          ${Number(price).toLocaleString()}
          <span className={styles.night}>night</span>
        </div>

        <DateInputsModal
          isSeparateModal={false}
          disabledDates={disabledDates}
          inputSelection={inputSelection}
          setInputSelection={setInputSelection}
        />
        <div
          className={styles.guest_block}
          data-input-selection-guest={inputSelection === "guests"}
        >
          <span className={styles.guests_label}>Guests</span>
          <Counter
            counter={guestsAmount}
            setCounter={setGuestsAmount}
            maxCount={guests_limit}
          />
        </div>
      </div>

      <div
        className={styles.request_reserve}
        data-date-is-selected={inputSelection === "checkOut"}
      >
        <Link href={reserveRedirectionLink}>
          <Tooltip
            isDisabled={!isDateIncludingUnavailableDates && !disabled}
            placement="top"
            content={
              disabled
                ? "You cant reserve your own place"
                : "Date is unavailable for reservation"
            }
            color="default"
            size="sm"
            delay={100}
            className="custome_tooltip warning"
          >
            <button
              inert={isDateIncludingUnavailableDates || disabled}
              className={styles.reserve_button}
              disabled={
                !isPublic || isDateIncludingUnavailableDates || disabled
              }
            >
              Reserve
            </button>
          </Tooltip>
        </Link>
        <p className={styles.reserve_text}>You will not be charged yet.</p>
      </div>

      {inputSelection !== "checkIn" && (
        <div className={styles.price_calculator}>
          <div className={styles.calculate_price_block}>
            <span className={styles.price_label}>
              ${Number(price).toLocaleString()} x{" "}
              {CountNights(parsedSearchDate.start, parsedSearchDate.end)} night
            </span>
            <span className={styles.price_result}>
              ${calculationOfPrice.toLocaleString()}
            </span>
          </div>

          <div className={styles.calculate_price_block}>
            <span className={styles.price_label}>Cleaning fee</span>
            <span className={styles.price_result}>
              $
              {CalculatePriceIncludingTax(
                calculationOfPrice
              ).with_cleaning_fee.toLocaleString()}
            </span>
          </div>

          <div className={styles.calculate_price_block}>
            <span className={styles.price_label}>Spacer fee</span>
            <span className={styles.price_result}>
              $
              {CalculatePriceIncludingTax(
                calculationOfPrice
              ).with_service_fee.toLocaleString()}
            </span>
          </div>

          <div className={styles.calculate_price_block}>
            <span className={styles.price_label}>Taxes</span>
            <span className={styles.price_result}>
              $
              {CalculatePriceIncludingTax(
                calculationOfPrice
              ).with_taxes.toLocaleString()}
            </span>
          </div>

          <div className={styles.calculate_total_block}>
            <span className={styles.price_label}>Total</span>
            <span className={styles.price_result}>
              $
              {CalculatePriceIncludingTax(
                calculationOfPrice
              ).total_price.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
