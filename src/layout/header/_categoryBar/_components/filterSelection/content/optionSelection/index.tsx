import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useGetListingsTypeOfPlaceQuery } from "@/store/api/endpoints/listings/getTypeOfPlace";

import { AccesableIcon } from "@/svgs/AccesableIcon";

import { SEARCH_PARAM_KEYS } from "@/layout/header/_lib/enums";
import { AssignNewQueryParams } from "@/helpers/paramsManagment";

import styles from "./optionSelection.module.scss";

export const OptionSelection: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const { data: typeOfPlace } = useGetListingsTypeOfPlaceQuery();
  const [selectedOptions, setSelectedOptions] = useState<{
    [SEARCH_PARAM_KEYS.SEARCH_ACCESABLE]: boolean;
    [SEARCH_PARAM_KEYS.SEARCH_SHARED_ROOM]: boolean;
  }>({
    [SEARCH_PARAM_KEYS.SEARCH_ACCESABLE]: false,
    [SEARCH_PARAM_KEYS.SEARCH_SHARED_ROOM]: false,
  });

  const handleSelectOption = (option: keyof typeof selectedOptions) => {
    setSelectedOptions((prev) => {
      return { ...prev, [option]: !prev[option] };
    });

    AssignNewQueryParams({
      updatedParams: {
        [option]: !selectedOptions[option]
          ? JSON.stringify(!selectedOptions[option])
          : null,
      },
      pathname,
      params,
      router,
    });
  };

  useEffect(() => {
    const accesable = params.get(SEARCH_PARAM_KEYS.SEARCH_ACCESABLE);
    const sharedRoom = params.get(SEARCH_PARAM_KEYS.SEARCH_SHARED_ROOM);

    if (accesable || sharedRoom) {
      setSelectedOptions((prev) => ({
        ...prev,
        [SEARCH_PARAM_KEYS.SEARCH_ACCESABLE]: accesable
          ? JSON.parse(accesable)
          : false,
        [SEARCH_PARAM_KEYS.SEARCH_SHARED_ROOM]: sharedRoom
          ? JSON.parse(sharedRoom)
          : false,
      }));
    } else {
      setSelectedOptions((prev) => ({
        ...prev,
        [SEARCH_PARAM_KEYS.SEARCH_ACCESABLE]: false,
        [SEARCH_PARAM_KEYS.SEARCH_SHARED_ROOM]: false,
      }));
    }
  }, [params]);

  return (
    <div className={styles.opation_container}>
      <div className={styles.option_wrap}>
        <input
          type="checkbox"
          id="accesable"
          name="accesable"
          onChange={() =>
            handleSelectOption(SEARCH_PARAM_KEYS.SEARCH_ACCESABLE)
          }
          className={styles.hidden_checkbox}
        />
        <label
          htmlFor="accesable"
          className={styles.option_label}
          data-selected={selectedOptions[SEARCH_PARAM_KEYS.SEARCH_ACCESABLE]}
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
              handleSelectOption(SEARCH_PARAM_KEYS.SEARCH_SHARED_ROOM)
            }
            className={styles.hidden_checkbox}
          />
          <label
            htmlFor="shared"
            className={styles.option_label}
            data-selected={
              selectedOptions[SEARCH_PARAM_KEYS.SEARCH_SHARED_ROOM]
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
    </div>
  );
};
