"use client";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DateValue } from "@nextui-org/calendar";
import { Button, Tooltip } from "@nextui-org/react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { today, getLocalTimeZone } from "@internationalized/date";

import { store } from "@/store";
import { requestCalendarUpdating } from "@/store/api/endpoints/listings/requestCalendarUpdating";
import { useGetCurrentListingQuery } from "@/store/api/endpoints/listings/getCurrentListing";

import { LeftArrow } from "@/svgs/LeftArrow";

import { ConverIntoDateValueFormat } from "@/helpers/dateManagment";

import { CustomDayComponent } from "../component/customDayComponent";
import { ConfirmationButton } from "@/components/confirmationButton";

import { IListingState } from "@/store/api/lib/interfaces";

import styles from "./calendar.module.scss";
import "./additionalStyles.scss";

interface CalendarPageContentProps {
  params: { id: string };
  listing: IListingState;
}
export const CalendarPageContent: React.FC<CalendarPageContentProps> = ({
  params,
  listing,
}) => {
  const router = useRouter();
  const localizer = momentLocalizer(moment);

  const [selectedDate, setSelectedDate] = useState<DateValue[]>([]);

  const [currentDate, setCurrentDate] = useState<{
    date: Date;
    isLessThenCurrentMonth: boolean;
  }>({
    date: new Date(),
    isLessThenCurrentMonth: false,
  });

  const [enableConfirmationButton, setEnableConfirmationButton] =
    useState(false);

  // CONDITIONS

  // SETUP
  const { messages } = useMemo(
    () => ({
      messages: {
        previous: "Previous month",
        next: "Next month",
      },
    }),
    []
  );

  const handleSelectDisableDate = (value: Date) => {
    const convertedValue = ConverIntoDateValueFormat(value);
    const isDateIncluded = selectedDate.some((date) => {
      return (
        date.day === convertedValue.day && date.month === convertedValue.month
      );
    });

    if (
      convertedValue.day <= today(getLocalTimeZone()).day &&
      convertedValue.month === today(getLocalTimeZone()).month
    ) {
      toast.error("You can't select past date");
      return;
    }

    setSelectedDate((prev) => {
      const newSelectedDate = isDateIncluded
        ? prev.filter(
            (date) =>
              date.day !== convertedValue.day &&
              date.month === convertedValue.month
          )
        : ([...prev, convertedValue] as DateValue[]);

      newSelectedDate?.length !== listing?.disabled_dates?.length;
      localStorage.setItem(`${params.id}`, JSON.stringify(newSelectedDate));

      return newSelectedDate;
    });

    setEnableConfirmationButton(true);
  };

  const onConfirm = async () => {
    try {
      const { error, data: res } = await store.dispatch(
        requestCalendarUpdating.initiate({
          disabledDates: selectedDate,
          id: Number(params.id),
        })
      );

      if (error && !res) throw new Error();

      setEnableConfirmationButton(false);
      localStorage.removeItem(`${params.id}`);
      router.push("/manage/listings");
    } catch (error) {
      toast.error("Something went wrong. Please try again", {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    }
  };

  const onNavigate = (date: Date) => {
    const currentMonth = new Date();
    const previousMonth = new Date(
      currentMonth.setMonth(currentMonth.getMonth() - 1)
    );
    if (date <= previousMonth) {
      setCurrentDate({ ...currentDate, isLessThenCurrentMonth: true });
      return;
    } else {
      setCurrentDate({
        date,
        isLessThenCurrentMonth: false,
      });
    }
  };

  useEffect(() => {
    const storedDates = localStorage.getItem(`${params.id}`);
    const formattedStoredDates = JSON.parse(storedDates || "[]");

    const formattedIncomingDates =
      listing?.disabled_dates?.filter(
        (date) =>
          date.day >= today(getLocalTimeZone()).day ||
          date.month >= today(getLocalTimeZone()).month
      ) || [];

    setEnableConfirmationButton(!!formattedStoredDates?.length);
    setSelectedDate(
      !!formattedStoredDates?.length
        ? formattedStoredDates
        : formattedIncomingDates
    );
  }, [listing?.disabled_dates, params.id]);

  return (
    <>
      <div className={styles.calendar_container}>
        <Calendar
          localizer={localizer}
          date={currentDate.date}
          onNavigate={onNavigate}
          components={{
            dateCellWrapper: (props: {
              value: Date;
              children: React.ReactElement;
            }) => {
              return (
                <CustomDayComponent
                  value={props.value}
                  handleSelectDisableDate={handleSelectDisableDate}
                  selectedDate={selectedDate.map(
                    (date: DateValue) =>
                      new Date(date.year, date.month - 1, date.day)
                  )}
                >
                  {props.children}
                </CustomDayComponent>
              );
            },
          }}
          messages={messages}
        />
        <Tooltip
          showArrow
          placement="top-start"
          content={"Go Back"}
          color="default"
          size="sm"
          delay={200}
          className="custome_tooltip info"
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className={styles.go_back_button}
          >
            <LeftArrow className={styles.go_back_button_icon} />
          </Button>
        </Tooltip>

        <ConfirmationButton
          onConfirm={onConfirm}
          enable={enableConfirmationButton}
          position="bottom-right"
        >
          Confirm
        </ConfirmationButton>
      </div>
    </>
  );
};
