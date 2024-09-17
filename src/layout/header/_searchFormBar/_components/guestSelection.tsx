import React, { memo, useEffect, useState } from "react";
import { Checkbox } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { setFetch } from "@/store/slices/listings/isSearchTriggeredSlice";

import { Counter } from "@/components/counter";
import { ModalPanel } from "@/components/modalPanel";

import { SelectionComponentsProps } from "./type";
import { SEARCH_PARAM_KEYS } from "../../_lib/enums";
import { TypesOfSelections } from "@/_utilities/enums";
import { useTriggeredSelectionData } from "../../_lib/context/context";

import { AssignNewQueryParams } from "@/helpers/paramsManagment";

import styles from "../search_form_bar.module.scss";

const GuestsSelection: React.FC<SelectionComponentsProps> = ({
  searchBarRef,
  handlePopUpMenuOpening,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const params = useSearchParams();

  const { triggeredSelection } = useTriggeredSelectionData();

  const [amoutOfGuests, setAmoutOfGuests] = useState<number>(0);
  const [includePets, setIncludePets] = useState<boolean>(false);

  useEffect(() => {
    if (amoutOfGuests !== 0) {
      AssignNewQueryParams({
        updatedParams: {
          [SEARCH_PARAM_KEYS.SEARCH_AMOUNT_OF_GUESTS]:
            JSON.stringify(amoutOfGuests),
        },
        pathname,
        params,
        router,
      });
    } else {
      AssignNewQueryParams({
        updatedParams: {
          [SEARCH_PARAM_KEYS.SEARCH_AMOUNT_OF_GUESTS]: null,
        },
        pathname,
        params,
        router,
      });
    }
    dispatch(setFetch(false));
  }, [amoutOfGuests, dispatch, params, pathname, router]);

  useEffect(() => {
    if (includePets) {
      AssignNewQueryParams({
        updatedParams: { pets: JSON.stringify(includePets) },
        pathname,
        params,
        router,
      });
    } else {
      AssignNewQueryParams({
        updatedParams: { pets: null },
        pathname,
        params,
        router,
      });
    }
    dispatch(setFetch(false));
  }, [dispatch, includePets, params, pathname, router]);

  useEffect(() => {
    const guests = JSON.parse(
      params.get(SEARCH_PARAM_KEYS.SEARCH_AMOUNT_OF_GUESTS) || "0"
    );
    const include_pets = JSON.parse(params.get("pets") || "false");

    setIncludePets(include_pets);
    setAmoutOfGuests(guests);
  }, [params]);

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
