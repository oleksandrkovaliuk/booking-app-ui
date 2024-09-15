import React, { memo, useEffect, useState } from "react";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Location } from "@/svgs/Location";
import boat_with_people from "@/assets/boat_with_people.webp";
import topPeekH from "@/assets/topPeekH.webp";

import { useDebounce } from "@/hooks/useDebounce";
import { ModalPanel } from "@/components/modalPanel";
import { AssignNewQueryParams } from "@/helpers/paramsManagment";

import {
  useStaysButtonContextData,
  useTriggeredSelectionApi,
  useTriggeredSelectionData,
} from "../../_lib/context/context";

import { ClearInputSelectionButton } from "./clearInputSelection";

import { SelectionComponentsProps } from "./type";
import { SEARCH_PARAM_KEYS } from "../../_lib/enums";
import { TypesOfSelections } from "@/_utilities/enums";

import { regionResponceType } from "../../_lib/types";
import { getCountriesByRequest } from "../../_lib/getCountriesByRequest";

import styles from "../search_form_bar.module.scss";
import Image from "next/image";

const RegionSelection: React.FC<SelectionComponentsProps> = ({
  searchBarRef,
  handlePopUpMenuOpening,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const { staysButtonState } = useStaysButtonContextData();

  const { setTriggeredSelection } = useTriggeredSelectionApi();
  const { triggeredSelection } = useTriggeredSelectionData();

  const [regionSelection, setRegionSelection] = useState<{
    value: string | null;
    country: string | null;
    city: string | null;
  }>({
    value: null,
    country: null,
    city: null,
  });
  const [responseForRegion, setResponseForRegion] = useState<[]>([]);

  const getData = async () => {
    try {
      const res = await getCountriesByRequest(regionSelection.value!);
      setResponseForRegion(res.data);
    } catch (error) {
      toast.info("Too many requests at the same time", {
        position: "bottom-center",
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    }
  };

  const delaiedDataResponse = useDebounce(getData, 600);

  const getRegionSelectionValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      delaiedDataResponse();

      setRegionSelection({
        value: e.target.value,
        country: null,
        city: null,
      });

      AssignNewQueryParams({
        updatedParams: {
          [SEARCH_PARAM_KEYS.SEARCH_CATEGORY_ID]: null,
        },
        params,
        router,
        pathname,
      });
    } else {
      AssignNewQueryParams({
        updatedParams: {
          [SEARCH_PARAM_KEYS.SEARCH_PLACE]: null,
        },
        params,
        router,
        pathname,
      });
      setResponseForRegion([]);
      setRegionSelection({
        value: null,
        country: null,
        city: null,
      });
    }
  };

  const handleClearRegionSelection = (e: React.MouseEvent) => {
    e.preventDefault();

    setRegionSelection({
      value: null,
      country: null,
      city: null,
    });

    setResponseForRegion([]);

    AssignNewQueryParams({
      updatedParams: {
        [SEARCH_PARAM_KEYS.SEARCH_PLACE]: null,
      },
      pathname,
      params,
      router,
    });
  };

  useEffect(() => {
    const storedRegionSelection = params.get(SEARCH_PARAM_KEYS.SEARCH_PLACE);

    if (storedRegionSelection)
      setRegionSelection({
        ...JSON.parse(storedRegionSelection),
      });
  }, [params]);

  return (
    <div
      role="button"
      className={styles.search_bar_input_container}
      onClick={(event) =>
        handlePopUpMenuOpening(event, TypesOfSelections.WHERE)
      }
      data-triggered={triggeredSelection === TypesOfSelections.WHERE}
    >
      {triggeredSelection === TypesOfSelections.WHERE &&
        searchBarRef.current && (
          <ModalPanel
            triggeredElementHeight={
              searchBarRef?.current?.getBoundingClientRect().height
            }
            triggeredElementLeft={0}
            gap={15}
            width={50}
            className={styles.modal_menu}
          >
            <div className={styles.search_region_modal}>
              {!regionSelection.value && !responseForRegion?.length && (
                <div className={styles.region_preview_container}>
                  <span className={styles.region_preview_text}>
                    Where do we heading today?
                  </span>
                  <Image
                    src={boat_with_people}
                    alt="boat_with_people"
                    width={500}
                    height={500}
                    className={styles.region_preview_main_img}
                  />
                </div>
              )}
              {!responseForRegion?.length && regionSelection.value ? (
                <div className={styles.spinner} />
              ) : (
                <div className={styles.search_results_selections_container}>
                  {responseForRegion?.map((countires: regionResponceType) => {
                    const formattedValue =
                      countires.city.length + countires.country.length > 20
                        ? `${countires.city}, ${countires.countryCode}`
                        : `${countires.city}, ${countires.country}`;
                    return (
                      <button
                        className={styles.countrie_responce_block}
                        key={countires.id}
                        onClick={(e: React.MouseEvent) => {
                          e.preventDefault();
                          setRegionSelection((prev) => {
                            setTriggeredSelection(
                              staysButtonState
                                ? TypesOfSelections.DATE_EXPERIENCES_CHECKIN
                                : TypesOfSelections.DATE
                            );
                            const value = formattedValue;

                            if (prev.value !== value) {
                              AssignNewQueryParams({
                                updatedParams: {
                                  [SEARCH_PARAM_KEYS.SEARCH_PLACE]:
                                    JSON.stringify({
                                      city: countires.city,
                                      country: countires.country,
                                      value: formattedValue,
                                    }),
                                },
                                pathname,
                                params,
                                router,
                              });

                              return {
                                value: formattedValue,
                                city: countires.city,
                                country: countires.country,
                              };
                            }
                            return prev;
                          });
                        }}
                      >
                        <div className={styles.countrie_responce_location_icon}>
                          <Location />
                        </div>
                        <span className={styles.countrie_responce_value}>
                          {formattedValue}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </ModalPanel>
        )}
      <div className={styles.input_wrap}>
        <input
          type="text"
          id="searchRegionInput"
          className={styles.search_bar_input}
          placeholder="Search destinations"
          onChange={getRegionSelectionValue}
          value={regionSelection?.value || ""}
        />
        <ClearInputSelectionButton
          show={
            !!regionSelection?.value &&
            triggeredSelection === TypesOfSelections.WHERE
          }
          callback={handleClearRegionSelection}
          disabled={!regionSelection?.value}
        />
      </div>

      <label htmlFor="searchRegionInput" className={styles.search_bar_label}>
        Where
      </label>
    </div>
  );
};

export const RegionSelectionComponent = memo(RegionSelection);
