import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { today, getLocalTimeZone } from "@internationalized/date";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DateValue, RangeCalendar, RangeValue } from "@nextui-org/calendar";

import { useSelector } from "@/store";
import { Counter } from "@/components/counter";

import {
  CountNights,
  DateFormatingMonthDay,
  ParseLocalStorageDates,
} from "@/helpers/dateManagment";

import { CreateNewQueryParams } from "@/helpers/paramsManagment";
import { CalculatePriceIncludingTax } from "@/helpers/priceManagment";

import {
  DateInputConrainerProps,
  ReserveListingBlockProps,
} from "../../_lib/type";
import { searchParamsKeys } from "@/layout/header/_lib/enums";

import styles from "./reserveListing.module.scss";
import "./additionalStyles.scss";

const DateInputsContainer: React.FC<DateInputConrainerProps> = ({
  disabledDates,
  inputSelection,
  setInputSelection,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const { isWidthEqual } = useSelector((state) => state.widthHandler);
  const { search_date } = useSelector((state) => state.searchSelection);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const parsedSearchDate = search_date
    ? ParseLocalStorageDates(search_date)
    : {
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({ weeks: 1 }),
      };

  const handleSetDateSelection = (value: RangeValue<DateValue>) => {
    if (value.start.toString() !== value.end.toString()) {
      const updatedParams = CreateNewQueryParams({
        updatedParams: {
          [searchParamsKeys.SEARCH_DATE]: JSON.stringify(value),
        },
        params,
      });

      router.replace(`${pathname}?${updatedParams}`, {
        scroll: false,
      });
      setInputSelection("checkOut");
    } else {
      toast(
        <div className="toast ">
          🫣 Selected dates cannot be the same. The minimum stay is one night.
        </div>
      );

      localStorage.removeItem("userDateSelection");
    }
  };

  const ModalComponent = (
    <div className={styles.modal} data-is-mobile={isWidthEqual[1280]}>
      <button
        aria-label="Close modal"
        className={styles.modal_bg}
        onClick={() => {
          setIsModalOpen(false);
          inputSelection === "checkOut"
            ? setInputSelection("guests")
            : setInputSelection("none");
        }}
      />
      <div className={styles.modal_container}>
        <div className={styles.modal_header}>
          <span className={styles.modal_title}>Select your booking dates</span>
          <p className={styles.modal_subtitle}>
            {inputSelection === "checkIn"
              ? "Minimum stay of 1 night"
              : `${DateFormatingMonthDay(
                  parsedSearchDate.start
                )} - ${DateFormatingMonthDay(parsedSearchDate.end)}`}
          </p>
        </div>
        <div className={styles.calendar_container}>
          <RangeCalendar
            aria-label="Booking dates"
            visibleMonths={3}
            onChange={(value: RangeValue<DateValue>) => {
              handleSetDateSelection(value);
            }}
            color="primary"
            minValue={today(getLocalTimeZone())}
            defaultValue={parsedSearchDate}
            isDateUnavailable={(date: DateValue) => {
              if (!date) return false;
              return disabledDates?.some(
                (disabledDate) =>
                  disabledDate.day === date.day &&
                  disabledDate.month === date.month &&
                  disabledDate.year === date.year
              );
            }}
          />
        </div>
        <div className={styles.modal_footer}>
          <button
            className={`${styles.modal_button} ${styles.clear_button}`}
            onClick={() => {
              const updatedParams = CreateNewQueryParams({
                updatedParams: {
                  [searchParamsKeys.SEARCH_DATE]: JSON.stringify({
                    start: today(getLocalTimeZone()),
                    end: today(getLocalTimeZone()).add({ weeks: 1 }),
                  }),
                },
                params,
              });

              router.replace(`${pathname}?${updatedParams}`, {
                scroll: false,
              });
              setInputSelection("none");
            }}
          >
            Clear dates
          </button>
          <button
            className={`${styles.modal_button} ${styles.close_button}`}
            onClick={() => {
              setIsModalOpen(false);

              inputSelection === "checkOut"
                ? setInputSelection("guests")
                : setInputSelection("none");
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isModalOpen && !isWidthEqual[1280] ? (
        ModalComponent
      ) : (
        <Modal
          size="lg"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          backdrop="opaque"
        >
          <ModalContent className={styles.mobile_modal_container}>
            <ModalBody>{ModalComponent}</ModalBody>
          </ModalContent>
        </Modal>
      )}
      <button
        className={styles.date_inputs_container}
        onClick={() => {
          setInputSelection("checkIn");
          setIsModalOpen(true);
        }}
      >
        <div
          className={styles.date_inputs_wrap}
          data-input-selection-checkin={inputSelection === "checkIn"}
          data-modal-open={isModalOpen}
        >
          <label htmlFor="dateInputCheckIn" className={styles.date_label}>
            Check-in
          </label>
          <input
            type="text"
            id="dateInputCheckIn"
            className={styles.date_input}
            placeholder="Add dates"
            value={DateFormatingMonthDay(parsedSearchDate.start)}
            readOnly
          />
        </div>
        <div
          className={styles.date_inputs_wrap}
          data-input-selection-checkout={inputSelection === "checkOut"}
          data-modal-open={isModalOpen}
        >
          <label htmlFor="dateInputCheckOut" className={styles.date_label}>
            Check-out
          </label>
          <input
            type="text"
            id="dateInputCheckOut"
            className={styles.date_input}
            placeholder="Add dates"
            value={DateFormatingMonthDay(parsedSearchDate.end)}
            readOnly
          />
        </div>
      </button>
    </>
  );
};
export const ReserveListingBlock: React.FC<ReserveListingBlockProps> = ({
  price,
  isPublic,
  guests_limit,
  disabledDates,
}) => {
  const params = useSearchParams();

  const parsedSearchDate = params.get(searchParamsKeys.SEARCH_DATE)
    ? ParseLocalStorageDates(params.get(searchParamsKeys.SEARCH_DATE)!)
    : {
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({ weeks: 1 }),
      };

  const [guestsAmount, setGuestsAmount] = useState(1);

  const [inputSelection, setInputSelection] = useState<
    "checkIn" | "checkOut" | "guests" | "none"
  >("none");

  const calculationOfPrice =
    Number(Number(price).toLocaleString().split(",").join("")) *
    CountNights(parsedSearchDate.start, parsedSearchDate.end);

  return (
    <div className={styles.reserve_listing_container}>
      <div className={styles.reserve_listing_main_block}>
        <div className={styles.price_block}>
          ${Number(price).toLocaleString()}
          <span className={styles.night}>night</span>
        </div>

        <DateInputsContainer
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
        <button className={styles.reserve_button} disabled={!isPublic}>
          Reserve
        </button>
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
