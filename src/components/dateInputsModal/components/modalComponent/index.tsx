import React from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { today, getLocalTimeZone } from "@internationalized/date";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useSelector } from "@/store";
import { isWidthHandlerSelector } from "@/store/selectors/isWidthHandler";
import { searchSelectionSelector } from "@/store/selectors/searchSelection";
import { DateValue, RangeCalendar, RangeValue } from "@nextui-org/calendar";
import { setSearchSelection } from "@/store/slices/search/searchSelectionSlice";

import { IModalComponentProps } from "../../_lib/interfaces";
import { searchParamsKeys } from "@/layout/header/_lib/enums";
import { DateFormatingMonthDay } from "@/helpers/dateManagment";
import { CreateNewQueryParams } from "@/helpers/paramsManagment";

import styles from "./modalComponent.module.scss";

export const ModalComponent: React.FC<IModalComponentProps> = ({
  children,

  setIsModalOpen,
  isSeparateModal,
  disabledDates,
  inputSelection,
  setInputSelection,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const params = useSearchParams();

  const { parsedSearchDate } = useSelector(searchSelectionSelector(params));
  const { desktop, mobile, tablet } = useSelector(isWidthHandlerSelector);

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

  return (
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
          {isSeparateModal && children}
        </div>
        <div className={styles.calendar_container}>
          <RangeCalendar
            aria-label="Booking dates"
            visibleMonths={mobile ? 1 : tablet ? 2 : 3}
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
};
