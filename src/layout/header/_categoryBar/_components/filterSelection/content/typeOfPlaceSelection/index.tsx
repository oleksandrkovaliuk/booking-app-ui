import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Skeleton, Tab, Tabs } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { setFetch } from "@/store/slices/listings/isSearchTriggeredSlice";
import { useGetListingsTypeOfPlaceQuery } from "@/store/api/endpoints/listings/getTypeOfPlace";

import { SEARCH_PARAM_KEYS } from "@/layout/header/_lib/enums";
import { AssignNewQueryParams } from "@/helpers/paramsManagment";

import styles from "./typeOfPlaceSelection.module.scss";

export const TypeOfPlaceSelection: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const params = useSearchParams();

  const {
    data: typeOfPlace,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetListingsTypeOfPlaceQuery();
  const [selectedType, setSelectedType] = useState<React.Key>(
    params.get(SEARCH_PARAM_KEYS.SEARCH_TYPE_OF_PLACE)
      ? JSON.parse(params.get(SEARCH_PARAM_KEYS.SEARCH_TYPE_OF_PLACE)!)
      : "clear"
  );

  const handleSelectedType = (key: React.Key | "clear") => {
    try {
      if (typeOfPlace && key) {
        const selectedType = typeOfPlace.find(
          (type) => type.id === Number(key)
        );

        if (selectedType?.id || key === "clear") {
          AssignNewQueryParams({
            updatedParams: {
              [SEARCH_PARAM_KEYS.SEARCH_TYPE_OF_PLACE]:
                key === "clear" ? null : JSON.stringify(selectedType?.id),
            },
            pathname,
            params,
            router,
          });
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
