import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Skeleton, Tab, Tabs } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

import { setFetch } from "@/store/slices/listings/isSearchTriggeredSlice";
import { setSearchSelection } from "@/store/slices/search/searchSelectionSlice";
import { useGetListingsTypeOfPlaceQuery } from "@/store/api/endpoints/listings/getTypeOfPlace";

import { searchParamsKeys } from "@/layout/header/_lib/enums";

import styles from "./typeOfPlaceSelection.module.scss";

export const TypeOfPlaceSelection: React.FC = () => {
  const dispatch = useDispatch();
  const params = useSearchParams();

  const {
    data: typeOfPlace,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetListingsTypeOfPlaceQuery();

  const [selectedType, setSelectedType] = useState<React.Key>(() => {
    if (params.get(searchParamsKeys.FILTER_TYPE_OF_PLACE)) {
      dispatch(
        setSearchSelection({
          [searchParamsKeys.FILTER_TYPE_OF_PLACE]: params.get(
            searchParamsKeys.FILTER_TYPE_OF_PLACE
          ),
        })
      );
      return JSON.parse(params.get(searchParamsKeys.FILTER_TYPE_OF_PLACE)!);
    } else {
      return "clear";
    }
  });

  const handleSelectedType = (key: React.Key | "clear") => {
    try {
      if (typeOfPlace && key) {
        const selectedType = typeOfPlace.find(
          (type) => type.id === Number(key)
        );

        if (selectedType?.id || key === "clear") {
          dispatch(
            setSearchSelection({
              [searchParamsKeys.FILTER_TYPE_OF_PLACE]:
                key === "clear" ? null : JSON.stringify(selectedType?.id),
            })
          );
          setSelectedType(key);
          dispatch(setFetch(false));
        }
      }
    } catch (error) {
      return;
    }
  };

  return (
    <div className={styles.type_of_place_container}>
      {isLoading || isFetching || !isSuccess ? (
        <Tabs
          aria-label="Type of place"
          className={styles.type_of_place_tabs_container}
          selectedKey={selectedType.toString()}
          onSelectionChange={handleSelectedType}
        >
          <Tab
            key={"loading"}
            title={<Skeleton />}
            className={styles.skeleton_tabs}
          />
          <Tab
            key={"loading2"}
            title={<Skeleton />}
            className={styles.skeleton_tabs}
          />
          <Tab
            key={"loading3"}
            title={<Skeleton />}
            className={styles.skeleton_tabs}
          />
        </Tabs>
      ) : (
        <Tabs
          aria-label="Type of place"
          className={styles.type_of_place_tabs_container}
          selectedKey={selectedType.toString()}
          onSelectionChange={handleSelectedType}
        >
          <Tab
            key={"clear"}
            title="Any type"
            className={styles.type_of_place_tab}
          />
          {typeOfPlace?.slice(1, 3)?.map((type) => (
            <Tab
              key={type.id}
              title={type.type_name}
              className={styles.type_of_place_tab}
            />
          ))}
        </Tabs>
      )}
    </div>
  );
};
