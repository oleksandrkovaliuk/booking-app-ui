"use client";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import moment from "moment";
import { toast } from "sonner";
import { useSelector } from "@/store";
import { useDispatch } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { getAllListings } from "@/store/thunks/listings/listings";
import { Button, useDisclosure } from "@nextui-org/react";
import { updateCalendar } from "@/store/thunks/listings/updateCalendar";

import { CustomDayComponent } from "../component/customDayComponent";
import { InfoModal } from "../component/infoModal";

import styles from "./calendar.module.scss";
import "./additionalStyles.scss";

interface CalendarPageContentProps {
  params: { id: string };
}
export const CalendarPageContent: React.FC<CalendarPageContentProps> = ({
  params,
}) => {
  const dispatch = useDispatch();
  const localizer = momentLocalizer(moment);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { listings, isLoading } = useSelector((state) => state.listingsInfo);

  const formatingIncomingDates = listings
    .find((listing) => listing.id === Number(params.id))
    ?.disabled_dates?.map((date: Date) => new Date(date))
    .filter((date) => date.getTime() > new Date().getTime());

  const [selectedDate, setSelectedDate] = useState<Date[]>([]);

  const [currentDate, setCurrentDate] = useState<{
    date: Date;
    isLessThenCurrentMonth: boolean;
  }>({
    date: new Date(),
    isLessThenCurrentMonth: false,
  });

  const [showConfirmationButton, setShowConfirmationButton] = useState(false);

  // CONDITIONS
  const isOnlyIncomingDatesAvailable =
    !selectedDate?.length && formatingIncomingDates;

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
    const isDateIncluded = isOnlyIncomingDatesAvailable
      ? formatingIncomingDates.some(
          (date) => date.getTime() === value.getTime()
        )
      : selectedDate.some((date) => date.getTime() === value.getTime());
    if (value <= new Date()) {
      return;
    }

    if (!isDateIncluded) {
      if (isOnlyIncomingDatesAvailable) {
        setSelectedDate([...formatingIncomingDates, value]);
      } else {
        setSelectedDate((prev) => [...prev, value]);
      }
    } else {
      if (isOnlyIncomingDatesAvailable) {
        setSelectedDate(
          formatingIncomingDates.filter(
            (date) => date.getTime() !== value.getTime()
          )
        );
      } else {
        setSelectedDate(
          selectedDate.filter((date) => date.getTime() !== value.getTime())
        );
      }
    }
    setShowConfirmationButton(true);
  };

  const onConfirm = async () => {
    try {
      await Promise.all([
        dispatch(
          updateCalendar({
            disabledDates: selectedDate,
            id: Number(params.id),
          }) as any
        ),
        dispatch(getAllListings() as any),
      ]);
      setShowConfirmationButton(false);
      localStorage.removeItem(`${params.id}`);
    } catch (error) {
      toast.error("Something went wrong");
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
    localStorage.setItem(`${params.id}`, JSON.stringify(selectedDate));
  }, [params.id, selectedDate]);

  useLayoutEffect(() => {
    if (localStorage.getItem(`${params.id}`)) {
      const formmatedStoredDates = JSON.parse(
        localStorage.getItem(`${params.id}`)!
      ).map((date: Date) => new Date(date));
      if (formmatedStoredDates?.length) {
        setShowConfirmationButton(true);
      }
      setSelectedDate(formmatedStoredDates?.length ? formmatedStoredDates : []);
    }
  }, [params.id]);
  useEffect(() => {
    const informationBeenShown = localStorage.getItem("informationBeenShown");
    if (informationBeenShown && JSON.parse(informationBeenShown)) {
      return;
    }
    onOpen();
    localStorage.setItem("informationBeenShown", JSON.stringify(true));
  }, [onOpen]);

  return (
    <>
      {isOpen && <InfoModal isOpen={isOpen} onClose={onClose} />}
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
                  selectedDate={
                    isOnlyIncomingDatesAvailable
                      ? formatingIncomingDates
                      : selectedDate
                  }
                >
                  {props.children}
                </CustomDayComponent>
              );
            },
          }}
          messages={messages}
        />
        <Button
          variant="solid"
          className={styles.apply_btn}
          data-changes-maden={
            selectedDate && selectedDate.length > 0 && showConfirmationButton
          }
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </div>
    </>
  );
};
