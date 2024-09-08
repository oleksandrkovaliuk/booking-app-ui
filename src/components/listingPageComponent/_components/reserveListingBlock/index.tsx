import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { today, getLocalTimeZone } from "@internationalized/date";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { DateValue, RangeCalendar, RangeValue } from "@nextui-org/calendar";

import {
  CountNights,
  DateFormatingMonthDay,
  isDateValueEqual,
} from "@/helpers/dateManagment";
import { Counter } from "@/components/counter";

import { Procantages } from "@/_utilities/enums";
import {
  DateInputConrainerProps,
  ReserveListingBlockProps,
} from "../../_lib/type";
import { SEARCH_PARAM_KEYS } from "@/layout/header/lib/enums";

import styles from "./reserveListing.module.scss";
import "./additionalStyles.scss";

const DateInputsContainer: React.FC<DateInputConrainerProps> = ({
  disabledDates,
  inputSelection,
  userDateSelection,
  setInputSelection,
  setUserDateSelection,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const ModalComponent = (
    <div className={styles.modal} data-is-mobile={isMobile}>
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
                  userDateSelection.start
                )} - ${DateFormatingMonthDay(userDateSelection.end)}`}
          </p>
        </div>
        <div className={styles.calendar_container}>
          <RangeCalendar
            aria-label="Booking dates"
            visibleMonths={3}
            onChange={(value: RangeValue<DateValue>) =>
              handleSetDateSelection(value)
            }
            color="primary"
            minValue={today(getLocalTimeZone())}
            value={userDateSelection}
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
              setUserDateSelection({
                start: today(getLocalTimeZone()),
                end: today(getLocalTimeZone()).add({ weeks: 1 }),
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

  const handleSetDateSelection = (value: RangeValue<DateValue>) => {
    if (value.start.toString() !== value.end.toString()) {
      setUserDateSelection({
        start: value.start,
        end: value.end,
      });
      localStorage.setItem(
        SEARCH_PARAM_KEYS.SEARCH_DATE,
        JSON.stringify({
          start: value.start,
          end: value.end,
        })
      );
      setInputSelection("checkOut");
    } else {
      toast(
        <div className="toast ">
          🫣 Selected dates cannot be the same. The minimum stay is one night.
        </div>
      );
      setUserDateSelection({
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({ weeks: 1 }),
      });
      localStorage.removeItem("userDateSelection");
    }
  };

  useEffect(() => {
    if (window && window.innerWidth <= 1280) setIsMobile(true);
  }, []);

  return (
    <>
      {isModalOpen && !isMobile ? (
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
            value={DateFormatingMonthDay(userDateSelection.start)}
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
            value={DateFormatingMonthDay(userDateSelection.end)}
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
  userDateSelection,
  setUserDateSelection,
  disabledDates,
}) => {
  const [guestsAmount, setGuestsAmount] = useState(1);

  const [inputSelection, setInputSelection] = useState<
    "checkIn" | "checkOut" | "guests" | "none"
  >("none");

  const isDefaultDate = isDateValueEqual(userDateSelection);

  const calculationOfPrice =
    Number(Number(price).toLocaleString().split(",").join("")) *
    CountNights(userDateSelection.start, userDateSelection.end);

  const calculateTaxes = Math.round(calculationOfPrice * Procantages.TAXES);
  const cleaningFee = Math.round(calculationOfPrice * Procantages.CLEANING_FEE);
  const serviceFee = Math.round(calculationOfPrice * Procantages.SPACER_FEE);

  const total = calculationOfPrice + calculateTaxes + cleaningFee + serviceFee;

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
          userDateSelection={userDateSelection}
          setUserDateSelection={setUserDateSelection}
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

      {!isDefaultDate && inputSelection !== "checkIn" && (
        <div className={styles.price_calculator}>
          <div className={styles.calculate_price_block}>
            <span className={styles.price_label}>
              ${Number(price).toLocaleString()} x{" "}
              {CountNights(userDateSelection.start, userDateSelection.end)}{" "}
              night
            </span>
            <span className={styles.price_result}>
              ${calculationOfPrice.toLocaleString()}
            </span>
          </div>

          <div className={styles.calculate_price_block}>
            <span className={styles.price_label}>Cleaning fee</span>
            <span className={styles.price_result}>${cleaningFee}</span>
          </div>

          <div className={styles.calculate_price_block}>
            <span className={styles.price_label}>Spacer fee</span>
            <span className={styles.price_result}>${serviceFee}</span>
          </div>

          <div className={styles.calculate_price_block}>
            <span className={styles.price_label}>Taxes</span>
            <span className={styles.price_result}>${calculateTaxes}</span>
          </div>

          <div className={styles.calculate_total_block}>
            <span className={styles.price_label}>Total</span>
            <span className={styles.price_result}>${total}</span>
          </div>
        </div>
      )}
    </div>
  );
};
