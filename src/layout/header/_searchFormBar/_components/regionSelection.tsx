import React, { memo, useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { store, useSelector } from "@/store";
import { UserSearchRegionHistory } from "@/store/api/lib/type";
import {
  updateUserSearchRegionHistory,
  useGetUserSearchRegionHistoryQuery,
} from "@/store/api/endpoints/search/getUserSearchRegionHistory";
import { setFetch } from "@/store/slices/listings/isSearchTriggeredSlice";
import { setSearchSelection } from "@/store/slices/search/searchSelectionSlice";

import { Location } from "@/svgs/Location";
import { SearchHistoryIcon } from "@/svgs/SearchHistoryIcon";
import boat_with_people from "@/assets/boat_with_people.webp";

import { useDebounce } from "@/hooks/useDebounce";
import { ModalPanel } from "@/components/modalPanel";

import {
  useStaysButtonContextData,
  useTriggeredSelectionApi,
  useTriggeredSelectionData,
} from "../../_lib/context/context";

import { ClearInputSelectionButton } from "./clearInputSelection";

import { SelectionComponentsProps } from "./type";
import { searchParamsKeys } from "../../_lib/enums";
import { TypesOfSelections } from "@/_utilities/enums";

import { regionResponceType } from "../../_lib/types";
import { getCountriesByRequest } from "../../_lib/getCountriesByRequest";

import styles from "../search_form_bar.module.scss";
import { isWidthHandlerSelector } from "@/store/selectors/isWidthHandler";

const RegionSelection: React.FC<SelectionComponentsProps> = ({
  searchBarRef,
  handlePopUpMenuOpening,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const params = useSearchParams();

  const { mobile, tablet } = useSelector(isWidthHandlerSelector);
  const { staysButtonState } = useStaysButtonContextData();

  const { setTriggeredSelection } = useTriggeredSelectionApi();
  const { triggeredSelection } = useTriggeredSelectionData();

  const {
    data: userSearchRegionHistory,
    isLoading: isUserSearchRegionHistoryLoading,
  } = useGetUserSearchRegionHistoryQuery();

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
  const [isResponseLoading, setIsResponseLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setIsResponseLoading(true);
      const res = await getCountriesByRequest(regionSelection.value!);
      setResponseForRegion(res.data);
      setIsResponseLoading(false);
    } catch (error) {
      setIsResponseLoading(false);

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

      dispatch(setFetch(false));
    } else {
      dispatch(
        setSearchSelection({
          [searchParamsKeys.SEARCH_PLACE]: null,
        })
      );
      setResponseForRegion([]);
      setRegionSelection({
        value: null,
        country: null,
        city: null,
      });
    }
  };

  const handleUserRegionSelection = async (
    e: React.MouseEvent,
    region: regionResponceType,
    formattedValue: string
  ) => {
    try {
      e.preventDefault();

      const date = new Intl.DateTimeFormat("en-US", {
        dateStyle: "short",
      }).format(new Date());

      setRegionSelection((prev) => {
        setTriggeredSelection(
          staysButtonState
            ? TypesOfSelections.DATE_EXPERIENCES_CHECKIN
            : TypesOfSelections.DATE
        );

        if (prev.value !== formattedValue) {
          dispatch(
            setSearchSelection({
              [searchParamsKeys.SEARCH_PLACE]: JSON.stringify({
                city: region.city,
                country: region.country,
                value: formattedValue,
              }),
            })
          );
          return {
            value: formattedValue,
            city: region.city,
            country: region.country,
          };
        }
        return prev;
      });

      await store.dispatch(
        updateUserSearchRegionHistory.initiate({
          id:
            new Date().getTime() +
            new Date().getDay() +
            new Date().getMonth() +
            new Date().getFullYear(),
          requestedAt: date,
          region: region,
          formattedValue: formattedValue,
        })
      );
    } catch (error) {
      return;
    }
  };

  const handleClearRegionSelection = (e: React.MouseEvent) => {
    e.preventDefault();

    const currentParams = new URLSearchParams(params);
    currentParams.delete(searchParamsKeys.SEARCH_PLACE);

    router.replace(`${pathname}?${currentParams.toString()}`, {
      scroll: false,
    });

    setRegionSelection({
      value: null,
      country: null,
      city: null,
    });

    setResponseForRegion([]);

    dispatch(
      setSearchSelection({
        [searchParamsKeys.SEARCH_PLACE]: null,
      })
    );

    dispatch(setFetch(false));
  };

  useEffect(() => {
    const storedRegionSelection = params.get(searchParamsKeys.SEARCH_PLACE);

    if (storedRegionSelection) {
      setRegionSelection({
        ...JSON.parse(storedRegionSelection),
      });
      dispatch(
        setSearchSelection({
          [searchParamsKeys.SEARCH_PLACE]: storedRegionSelection,
        })
      );
    } else {
      setRegionSelection({
        value: null,
        country: null,
        city: null,
      });
    }
  }, [dispatch, params]);

  useEffect(() => {
    if (tablet || mobile) {
      setTriggeredSelection(TypesOfSelections.WHERE);
    }
  }, [mobile, setTriggeredSelection, tablet]);

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
        searchBarRef?.current && (
          <ModalPanel
            triggeredElementHeight={
              searchBarRef?.current?.getBoundingClientRect().height
            }
            triggeredElementLeft={0}
            gap={15}
            width={
              !responseForRegion.length &&
              userSearchRegionHistory?.length &&
              !regionSelection.value
                ? 100
                : 50
            }
            className={styles.modal_menu}
          >
            <div className={styles.search_region_modal}>
              {!isResponseLoading &&
                userSearchRegionHistory?.length &&
                !isUserSearchRegionHistoryLoading &&
                !responseForRegion.length && (
                  <ul className={styles.user_search_history}>
                    <li className={styles.user_search_history_title}>
                      <span className={styles.user_search_history_title_text}>
                        Recent search
                      </span>
                    </li>
                    {userSearchRegionHistory?.map(
                      (history: UserSearchRegionHistory, i) => (
                        <li
                          className={styles.user_search_history_block}
                          key={`${history.requestedAt} + ${i}`}
                          onClick={(e) =>
                            handleUserRegionSelection(
                              e,
                              history.region,
                              history.formattedValue
                            )
                          }
                        >
                          <div className={styles.user_search_history_icon}>
                            <SearchHistoryIcon />
                          </div>
                          <div
                            className={styles.user_search_history_text_content}
                          >
                            <span className={styles.user_search_history_region}>
                              {history.formattedValue}
                            </span>
                            <span className={styles.user_search_history_date}>
                              {history.requestedAt}
                            </span>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                )}

              {!isResponseLoading &&
                !isUserSearchRegionHistoryLoading &&
                !regionSelection.value &&
                !responseForRegion.length && (
                  <div
                    className={styles.region_preview_container}
                    data-is-only-element={!userSearchRegionHistory?.length}
                  >
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

              {isResponseLoading && (
                <div
                  className={styles.spinner}
                  data-is-only-element={!userSearchRegionHistory?.length}
                />
              )}

              {!isResponseLoading && !!responseForRegion?.length && (
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
                        onClick={(e: React.MouseEvent) =>
                          handleUserRegionSelection(
                            e,
                            countires,
                            formattedValue
                          )
                        }
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
          inert
          type="text"
          autoFocus={triggeredSelection === TypesOfSelections.WHERE}
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
