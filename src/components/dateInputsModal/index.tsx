import React, { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { today, getLocalTimeZone } from "@internationalized/date";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DateValue, RangeCalendar, RangeValue } from "@nextui-org/calendar";

import { useSelector } from "@/store";
import { isWidthHandlerSelector } from "@/store/selectors/isWidthHandler";
import { searchSelectionSelector } from "@/store/selectors/searchSelection";
import { setSearchSelection } from "@/store/slices/search/searchSelectionSlice";

import {
  DateFormatingMonthDay,
  ParseLocalStorageDates,
} from "@/helpers/dateManagment";
import { CreateNewQueryParams } from "@/helpers/paramsManagment";

import { DateInputsModalProps } from "./_lib/interfaces";
import { searchParamsKeys } from "@/layout/header/_lib/enums";

import styles from "./dateInputsModal.module.scss";

export const DateInputsModal: React.FC<DateInputsModalProps> = ({
  isSeparateModal,
  disabledDates,
  inputSelection,
  setInputSelection,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const params = useSearchParams();

  const { desktop, mobile, tablet } = useSelector(isWidthHandlerSelector);
  const { search_date } = useSelector(searchSelectionSelector);

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
      dispatch(setSearchSelection({ search_date: JSON.stringify(value) }));
    } else {
      toast(
        <div className="toast ">
          🫣 Selected dates cannot be the same. The minimum stay is one night.
        </div>
      );

      localStorage.removeItem("userDateSelection");
    }
  };

  const RegularStatisDatesPicker = (
    <button
      className={styles.date_inputs_container}
      onClick={() => {
        setInputSelection("checkIn");
        setIsModalOpen(true);
      }}
      data-is-modal-separate={isSeparateModal}
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
  );

  const ModalComponent = (
    <div
      className={styles.modal}
      data-is-mobile={!desktop || isSeparateModal}
      data-is-modal-separate={isSeparateModal}
    >
      {!isSeparateModal && (
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
      )}
      <div className={styles.modal_container}>
        <div className={styles.modal_header}>
          <div className={styles.modal_header_text}>
            <span className={styles.modal_title}>
              Select your booking dates
            </span>
            <p className={styles.modal_subtitle}>
              {inputSelection === "checkIn"
                ? "Minimum stay of 1 night"
                : `${DateFormatingMonthDay(
                    parsedSearchDate.start
                  )} - ${DateFormatingMonthDay(parsedSearchDate.end)}`}
            </p>
          </div>
          {isSeparateModal && RegularStatisDatesPicker}
        </div>
        <div className={styles.calendar_container}>
          <RangeCalendar
            aria-label="Booking dates"
            visibleMonths={
              mobile && !isSeparateModal
                ? 1
                : tablet && !isSeparateModal
                ? 2
                : 3
            }
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

              dispatch(
                setSearchSelection({
                  search_date: JSON.stringify({
                    start: today(getLocalTimeZone()),
                    end: today(getLocalTimeZone()).add({ weeks: 1 }),
                  }),
                })
              );
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
      {isModalOpen && desktop && !isSeparateModal ? (
        ModalComponent
      ) : (
        <Modal
          size={isSeparateModal ? "3xl" : "xl"}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          backdrop="opaque"
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
          <ModalContent className={styles.mobile_modal_container}>
            <ModalBody>{ModalComponent}</ModalBody>
          </ModalContent>
        </Modal>
      )}
      {!isSeparateModal ? (
        RegularStatisDatesPicker
      ) : (
        <button
          className={styles.edit_button}
          onClick={() => {
            setInputSelection("checkIn");
            setIsModalOpen(true);
          }}
        >
          Edit
        </button>
      )}
    </>
  );
};
