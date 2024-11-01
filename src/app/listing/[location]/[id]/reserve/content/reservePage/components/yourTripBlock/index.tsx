import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";

import { useSelector } from "@/store";
import { searchSelectionSelector } from "@/store/selectors/searchSelection";
import { setSearchSelection } from "@/store/slices/search/searchSelectionSlice";

import { Counter } from "@/components/counter";
import { DateInputsModal } from "@/components/dateInputsModal";

import { DateFormatingMonthDay } from "@/helpers/dateManagment";

import { searchParamsKeys } from "@/layout/header/_lib/enums";
import { IYourTripBlockProps } from "../../../_lib/interfaces";

import styles from "./yourTrip.module.scss";
import global from "../../reservePage.module.scss";

export const YourTripBlock: React.FC<IYourTripBlockProps> = ({
  disabledDates,
}) => {
  const dispatch = useDispatch();
  const params = useSearchParams();
  const convertedParams = Object.fromEntries(params.entries()) as {
    [key in searchParamsKeys | "guests_limit"]: string;
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { search_amountOfGuests, parsedSearchDate } = useSelector(
    searchSelectionSelector(params)
  );

  const [isCounterActive, setIsCounterActive] = useState<boolean>(false);
  const [guestsAmount, setGuestsAmount] = useState<number>(
    search_amountOfGuests ? JSON.parse(search_amountOfGuests) : 1
  );

  const [inputSelection, setInputSelection] = useState<
    "checkIn" | "checkOut" | "guests" | "none"
  >("checkIn");

  // CONSTANTS

  const formattedDatesField = `${DateFormatingMonthDay(
    parsedSearchDate.start
  )} - ${DateFormatingMonthDay(parsedSearchDate.end)}`;

  useEffect(() => {
    if (guestsAmount !== JSON.parse(search_amountOfGuests!)) {
      setIsCounterActive(true);
    }
  }, [guestsAmount, search_amountOfGuests]);

  return (
    <>
      <Modal
        size="sm"
        isOpen={isOpen}
        onClose={onClose}
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
        className={styles.counter_modal}
      >
        <ModalContent>
          <ModalHeader>Change guests amout</ModalHeader>
          <ModalBody>
            <div
              className={styles.counter_block}
              onClick={() => setIsCounterActive(true)}
              data-is-counter-active={isCounterActive}
            >
              <span className={styles.counter_label}>Guests</span>
              <Counter
                counter={guestsAmount}
                setCounter={setGuestsAmount}
                maxCount={
                  convertedParams.guests_limit
                    ? JSON.parse(convertedParams.guests_limit)
                    : "1"
                }
              />
            </div>
          </ModalBody>
          <ModalFooter className={styles.modal_footer}>
            <Button
              size="md"
              variant="light"
              className={styles.clear_btn}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              size="md"
              className={styles.apply_btn}
              isDisabled={
                guestsAmount === JSON.parse(search_amountOfGuests!) ||
                !convertedParams.guests_limit
              }
              onClick={() => {
                dispatch(
                  setSearchSelection({
                    [searchParamsKeys.SEARCH_AMOUNT_OF_GUESTS]:
                      guestsAmount !== 0 ? JSON.stringify(guestsAmount) : null,
                  })
                );
                onClose();
              }}
            >
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className={styles.your_trip_section}>
        <h5 className={global.title}>Your trip</h5>
        <div className={styles.your_trip_block}>
          <div className={styles.your_trip_text}>
            <span className={global.sub_title}>Dates</span>
            <div className={global.sub_description}>{formattedDatesField}</div>
          </div>
          <DateInputsModal
            isSeparateModal
            disabledDates={disabledDates}
            inputSelection={inputSelection}
            setInputSelection={setInputSelection}
          />
        </div>
        <div className={styles.your_trip_block}>
          <div className={styles.your_trip_text}>
            <span className={global.sub_title}>Guests</span>
            <div className={global.sub_description}>{guestsAmount} guests</div>
          </div>
          <button
            className={styles.your_trip_edit_button}
            onClick={() => {
              onOpen();
              setIsCounterActive(false);
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
};
