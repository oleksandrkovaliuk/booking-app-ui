import React, { memo, useEffect, useState } from "react";
import { Checkbox } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { setFetch } from "@/store/slices/listings/isSearchTriggeredSlice";
import { setSearchSelection } from "@/store/slices/search/searchSelectionSlice";

import { Counter } from "@/components/counter";
import { ModalPanel } from "@/components/modalPanel";

import { SelectionComponentsProps } from "./type";
import { searchParamsKeys } from "../../_lib/enums";
import { TypesOfSelections } from "@/_utilities/enums";
import { useTriggeredSelectionData } from "../../_lib/context/context";

import styles from "../search_form_bar.module.scss";

const GuestsSelection: React.FC<SelectionComponentsProps> = ({
  searchBarRef,
  handlePopUpMenuOpening,
}) => {
  const dispatch = useDispatch();
  const params = useSearchParams();

  const { triggeredSelection } = useTriggeredSelectionData();

  const [amoutOfGuests, setAmoutOfGuests] = useState<number>(0);
  const [includePets, setIncludePets] = useState<boolean>(false);

  useEffect(() => {
    dispatch(
      setSearchSelection({
        [searchParamsKeys.SEARCH_AMOUNT_OF_GUESTS]:
          amoutOfGuests !== 0 ? JSON.stringify(amoutOfGuests) : null,
      })
    );

    dispatch(setFetch(false));
  }, [amoutOfGuests, dispatch]);

  useEffect(() => {
    dispatch(
      setSearchSelection({
        [searchParamsKeys.SEARCH_INCLUDE_PETS]: JSON.stringify(includePets),
      })
    );

    dispatch(setFetch(false));
  }, [dispatch, includePets]);

  useEffect(() => {
    const guests = JSON.parse(
      params.get(searchParamsKeys.SEARCH_AMOUNT_OF_GUESTS) || "0"
    );
    const include_pets = JSON.parse(
      params.get(searchParamsKeys.SEARCH_INCLUDE_PETS) || "false"
    );

    dispatch(
      setSearchSelection({
        [searchParamsKeys.SEARCH_AMOUNT_OF_GUESTS]: guests,
        [searchParamsKeys.SEARCH_INCLUDE_PETS]: include_pets,
      })
    );

    setIncludePets(include_pets);
    setAmoutOfGuests(guests);
  }, [dispatch, params]);

  return (
    <div
      className={styles.search_bar_input_container}
      onClick={(event) =>
        handlePopUpMenuOpening(event, TypesOfSelections.GUEST)
      }
      data-triggered={triggeredSelection === TypesOfSelections.GUEST}
    >
      {triggeredSelection === TypesOfSelections.GUEST &&
        searchBarRef.current && (
          <ModalPanel
            triggeredElementHeight={
              searchBarRef?.current?.getBoundingClientRect().height
            }
            triggeredElementRight={0}
            gap={15}
            width={50}
            className={styles.modal_menu}
          >
            <div className={styles.modal_menu_guest_settings}>
              <div className={styles.modal_menu_guest_settings_text}>
                <span className={styles.modal_menu_guest_settings_title}>
                  Guest
                </span>
                <p className={styles.modal_menu_guest_settings_note}>
                  Including children
                </p>
              </div>
              <Counter counter={amoutOfGuests} setCounter={setAmoutOfGuests} />
            </div>
            <div className={styles.modal_menu_guest_settings}>
              <div className={styles.modal_menu_guest_settings_text}>
                <span className={styles.modal_menu_guest_settings_title}>
                  Pets
                </span>
                <p className={styles.modal_menu_guest_settings_note}>
                  Include pets
                </p>
              </div>
              <div className={styles.modal_menu_pets_checkbox}>
                <Checkbox
                  isSelected={includePets}
                  onValueChange={setIncludePets}
                  isDisabled={amoutOfGuests === 0}
                  className={styles.modal_menu_pets_checkbox_input}
                />
              </div>
            </div>
          </ModalPanel>
        )}
      <div className={styles.input_wrap}>
        <input
          type="text"
          id="Guests"
          className={styles.search_bar_input}
          placeholder="Add guests"
          value={
            amoutOfGuests
              ? `${amoutOfGuests} guests ${includePets ? ", with pets" : ""}`
              : ""
          }
          readOnly
        />
      </div>
      <label htmlFor="Guests" className={styles.search_bar_label}>
        Who
      </label>
    </div>
  );
};

export const GuestsSelectionComponent = memo(GuestsSelection);
