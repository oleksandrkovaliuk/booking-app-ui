import React from "react";
import { useSearchParams } from "next/navigation";

import { useSelector } from "@/store";
import { searchSelectionSelector } from "@/store/selectors/searchSelection";

import { DateFormatingMonthDay } from "@/helpers/dateManagment";
import { DateInputsPickerProps } from "../../_lib/interfaces";

import styles from "./dateInputsPicker.module.scss";

export const DateInputsPicker: React.FC<DateInputsPickerProps> = ({
  isSeparateModal,
  isModalOpen,
  setIsModalOpen,
  inputSelection,
  setInputSelection,
}) => {
  const params = useSearchParams();
  const { parsedSearchDate } = useSelector(searchSelectionSelector(params));

  return (
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
};
