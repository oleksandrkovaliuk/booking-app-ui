import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Skeleton } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

import { setFetch } from "@/store/slices/listings/isSearchTriggeredSlice";
import { setSearchSelection } from "@/store/slices/search/searchSelectionSlice";
import { useGetListingsTypeOfPlaceQuery } from "@/store/api/endpoints/listings/getTypeOfPlace";

import { AccesableIcon } from "@/svgs/AccesableIcon";

import { searchParamsKeys } from "@/layout/header/_lib/enums";

import styles from "./optionSelection.module.scss";

export const OptionSelection: React.FC = () => {
  const dispatch = useDispatch();
  const params = useSearchParams();

  const {
    data: typeOfPlace,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetListingsTypeOfPlaceQuery();
  const [selectedOptions, setSelectedOptions] = useState<{
    [searchParamsKeys.FILTER_ACCESABLE]: boolean;
    [searchParamsKeys.FILTER_SHARED_ROOM]: boolean;
  }>({
    [searchParamsKeys.FILTER_ACCESABLE]: false,
    [searchParamsKeys.FILTER_SHARED_ROOM]: false,
  });

  const handleSelectOption = (option: keyof typeof selectedOptions) => {
    setSelectedOptions((prev) => {
      dispatch(
        setSearchSelection({
          [option]: !prev[option],
        })
      );
      return { ...prev, [option]: !prev[option] };
    });

    dispatch(setFetch(false));
  };

  useEffect(() => {
    const accesable = params.get(searchParamsKeys.FILTER_ACCESABLE);
    const sharedRoom = params.get(searchParamsKeys.FILTER_SHARED_ROOM);

    if (accesable || sharedRoom) {
      setSelectedOptions((prev) => ({
        ...prev,
        [searchParamsKeys.FILTER_ACCESABLE]: JSON.parse(accesable!),
        [searchParamsKeys.FILTER_SHARED_ROOM]: JSON.parse(sharedRoom!),
      }));

      dispatch(
        setSearchSelection({
          [searchParamsKeys.FILTER_ACCESABLE]: accesable,
          [searchParamsKeys.FILTER_SHARED_ROOM]: sharedRoom,
        })
      );
    } else {
      setSelectedOptions((prev) => ({
        ...prev,
        [searchParamsKeys.FILTER_ACCESABLE]: false,
        [searchParamsKeys.FILTER_SHARED_ROOM]: false,
      }));
    }
  }, [dispatch, params]);

  return (
    <div className={styles.opation_container}>
      {isLoading || isFetching || !isSuccess ? (
        <>
          <div className={styles.option_wrap}>
            <Skeleton data-loader={true} className={styles.option_label} />
          </div>
          <div className={styles.option_wrap}>
            <Skeleton data-loader={true} className={styles.option_label} />
          </div>
          <div className={styles.option_wrap}>
            <Skeleton data-loader={true} className={styles.option_label} />
          </div>
        </>
      ) : (
        <>
          <div className={styles.option_wrap}>
            <input
              type="checkbox"
              id="accesable"
              name="accesable"
              onChange={() =>
                handleSelectOption(searchParamsKeys.FILTER_ACCESABLE)
              }
              className={styles.hidden_checkbox}
            />
            <label
              htmlFor="accesable"
              className={styles.option_label}
              data-selected={selectedOptions[searchParamsKeys.FILTER_ACCESABLE]}
            >
              <AccesableIcon className={styles.option_icon} />
              <span className={styles.option_title}>Accesable</span>
            </label>
          </div>
          {typeOfPlace && (
            <div className={styles.option_wrap}>
              <input
                type="checkbox"
                id="shared"
                name="shared"
                onChange={() =>
                  handleSelectOption(searchParamsKeys.FILTER_SHARED_ROOM)
                }
                className={styles.hidden_checkbox}
              />
              <label
                htmlFor="shared"
                className={styles.option_label}
                data-selected={
                  selectedOptions[searchParamsKeys.FILTER_SHARED_ROOM]
                }
              >
                <Image
                  src={typeOfPlace[0].type_img}
                  alt={typeOfPlace[0].type_img}
                  width={20}
                  height={20}
                  className={styles.option_icon}
                />
                <span className={styles.option_title}>Shared Room</span>
              </label>
            </div>
          )}
        </>
      )}
    </div>
  );
};
