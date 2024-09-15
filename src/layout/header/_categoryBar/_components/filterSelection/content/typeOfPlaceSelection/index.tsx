import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useGetListingsTypeOfPlaceQuery } from "@/store/api/endpoints/listings/getTypeOfPlace";

import { SEARCH_PARAM_KEYS } from "@/layout/header/_lib/enums";
import { AssignNewQueryParams } from "@/helpers/paramsManagment";

import styles from "./typeOfPlaceSelection.module.scss";

export const TypeOfPlaceSelection: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const { data: typeOfPlace } = useGetListingsTypeOfPlaceQuery();
  const [selectedType, setSelectedType] = useState<React.Key>(0);

  const handleSelectedType = (key: React.Key | "clear") => {
    try {
      if (typeOfPlace && key) {
        const selectedType = typeOfPlace.find(
          (type) => type.id === Number(key)
        );
        AssignNewQueryParams({
          updatedParams: {
            [SEARCH_PARAM_KEYS.SEARCH_TYPE_OF_PLACE]:
              key === "clear" ? null : JSON.stringify(selectedType),
          },
          pathname,
          params,
          router,
        });
        setSelectedType(key);
      }
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    const storedTypeOfPlace = params.get(
      SEARCH_PARAM_KEYS.SEARCH_TYPE_OF_PLACE
    );

    if (storedTypeOfPlace) {
      const parsedTypeOfPlace = JSON.parse(storedTypeOfPlace);
      setSelectedType(parsedTypeOfPlace.id);
    }
  }, [params]);
  return (
    <div className={styles.type_of_place_container}>
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
        {typeOfPlace?.slice(1, 3)?.map((tabs) => (
          <Tab
            key={tabs.id}
            title={tabs.type_name}
            className={styles.type_of_place_tab}
          />
        ))}
      </Tabs>
    </div>
  );
};
