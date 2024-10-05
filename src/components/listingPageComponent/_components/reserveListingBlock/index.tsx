import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { today, getLocalTimeZone } from "@internationalized/date";
import { usePathname, useSearchParams } from "next/navigation";

import { useSelector } from "@/store";
import { searchSelectionSelector } from "@/store/selectors/searchSelection";
import { setSearchSelection } from "@/store/slices/search/searchSelectionSlice";

import { Counter } from "@/components/counter";
import { DateInputsModal } from "@/components/dateInputsModal";

import { CountNights, ParseLocalStorageDates } from "@/helpers/dateManagment";

import { CalculatePriceIncludingTax } from "@/helpers/priceManagment";

import { ReserveListingBlockProps } from "../../_lib/type";
import { searchParamsKeys } from "@/layout/header/_lib/enums";

import styles from "./reserveListing.module.scss";
import "./additionalStyles.scss";

export const ReserveListingBlock: React.FC<ReserveListingBlockProps> = ({
  price,
  isPublic,
  guests_limit,
  disabledDates,
}) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const params = useSearchParams();

  const { search_amountOfGuests } = useSelector(searchSelectionSelector);

  const [guestsAmount, setGuestsAmount] = useState<number>(
    JSON.parse(search_amountOfGuests || "1")
  );

  const [inputSelection, setInputSelection] = useState<
    "checkIn" | "checkOut" | "guests" | "none"
  >("none");

  // CONSTANTS
  const parsedSearchDate = params.get(searchParamsKeys.SEARCH_DATE)
    ? ParseLocalStorageDates(params.get(searchParamsKeys.SEARCH_DATE)!)
    : {
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({ weeks: 1 }),
      };

  const calculationOfPrice =
    Number(Number(price).toLocaleString().split(",").join("")) *
    CountNights(parsedSearchDate.start, parsedSearchDate.end);

  const reserveRedirectionLink = `${pathname}/reserve?${params}&calculation=${calculationOfPrice}&guests_limit=${guests_limit}`;

  useEffect(() => {
    dispatch(
      setSearchSelection({
        [searchParamsKeys.SEARCH_AMOUNT_OF_GUESTS]:
          guestsAmount !== 0 ? JSON.stringify(guestsAmount) : null,
      })
    );
  }, [guestsAmount, dispatch]);

  useEffect(() => {
    const guests = JSON.parse(
      params.get(searchParamsKeys.SEARCH_AMOUNT_OF_GUESTS) || "0"
    );

    dispatch(
      setSearchSelection({
        [searchParamsKeys.SEARCH_AMOUNT_OF_GUESTS]: guests,
      })
    );

    setGuestsAmount(guests);
  }, [dispatch, params]);
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
          <button className={styles.reserve_button} disabled={!isPublic}>
            Reserve
          </button>
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
