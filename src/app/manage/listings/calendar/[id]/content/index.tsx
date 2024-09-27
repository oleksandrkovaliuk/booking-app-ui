"use client";
import React, { useLayoutEffect, useMemo, useState } from "react";
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

import styles from "./calendar.module.scss";
import "./additionalStyles.scss";

interface CalendarPageContentProps {
  params: { id: string };
}
export const CalendarPageContent: React.FC<CalendarPageContentProps> = ({
  params,
}) => {
  const router = useRouter();
  const localizer = momentLocalizer(moment);

  const { data: listing } = useGetCurrentListingQuery({
    id: Number(params.id),
  });

  const [selectedDate, setSelectedDate] = useState<DateValue[]>([]);

  const [currentDate, setCurrentDate] = useState<{
    date: Date;
    isLessThenCurrentMonth: boolean;
  }>({
    date: new Date(),
    isLessThenCurrentMonth: false,
  });

  const [enableConfirmationButton, setEnableConfirmationButton] =
    useState(true);

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

    if (isDateIncluded) {
      setSelectedDate((prev) =>
        prev.filter(
          (date) =>
            date.day !== convertedValue.day &&
            date.month === convertedValue.month
        )
      );
    } else {
      setSelectedDate((prev) => [...prev, convertedValue] as DateValue[]);
    }

    setEnableConfirmationButton(true);
  };

  const onConfirm = async () => {
    try {
      const { data: res, error } = await store.dispatch(
        requestCalendarUpdating.initiate({
          disabledDates: selectedDate,
          id: Number(params.id),
        })
      );

      if (error && !res) throw new Error();

      setEnableConfirmationButton(false);
      localStorage.removeItem(`${params.id}`);
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

  useLayoutEffect(() => {
    const storedDates = localStorage.getItem(`${params.id}`);
    const formattedIncomingDates = listing?.disabled_dates?.filter(
      (date) =>
        date.day >= today(getLocalTimeZone()).day ||
        date.month >= today(getLocalTimeZone()).month
    );

    if (storedDates) {
      const formattedStoredDates = JSON.parse(storedDates);
      if (formattedStoredDates.length) {
        setEnableConfirmationButton(true);
        setSelectedDate(formattedStoredDates);
      } else {
        setSelectedDate(formattedIncomingDates || []);
      }
    }
  }, [listing?.disabled_dates, params.id]);

  useLayoutEffect(() => {
    if (listing?.disabled_dates?.length !== selectedDate?.length) {
      localStorage.setItem(`${params.id}`, JSON.stringify(selectedDate));
    }
  }, [listing?.disabled_dates?.length, params.id, selectedDate]);

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
          classNames={{
            content: ["text-#2f2f2f font-medium rounded-lg"],
          }}
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className={styles.go_back_button}
          >
            <LeftArrow className={styles.go_back_button_icon} />
          </Button>
        </Tooltip>
        <Link inert={!enableConfirmationButton} href="/manage/listings">
          <ConfirmationButton
            onConfirm={onConfirm}
            enable={enableConfirmationButton}
            position="bottom-right"
          >
            Confirm
          </ConfirmationButton>
        </Link>
      </div>
    </>
  );
};
