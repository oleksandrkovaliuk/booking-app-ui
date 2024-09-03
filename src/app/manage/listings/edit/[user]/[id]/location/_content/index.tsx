"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useForm, UseFormSetValue } from "react-hook-form";

import { useGetCurrentListingQuery } from "@/store/api/endpoints/listings/getCurrentListing";

import { updateListing } from "@/app/api/apiCalls";
import { Location } from "@/app/manage/_components/createForm/content/_components/location";

import { handleUpdateFormAndLocalStorage } from "@/helpers/updateFormAndStorageStates";
import { requirmentForAddressComponent } from "@/helpers/address/formattedAddressVariants";

import { GoogleMapProps } from "@/components/googleMap/type";
import { ConfirmationButton } from "@/components/confirmationButton";

import { ContentProps, EditFormValues } from "../../type";

import styles from "./location.module.scss";
import "../../shared/sharedStyles.scss";

export const LocationContent: React.FC<ContentProps> = ({ params }) => {
  const setValueRef = useRef<UseFormSetValue<EditFormValues> | null>(null);

  const { data: listing } = useGetCurrentListingQuery({
    id: Number(params?.id),
  });

  const [enableConfirmationButton, setEnableConfirmationButton] =
    useState<boolean>(false);

  const { register, watch, setValue } = useForm({
    defaultValues: {
      edit_cordinates: {},
      edit_address: {},
    } as EditFormValues,
  });

  const selectedCordinates = watch("edit_cordinates");
  const selectedAddress = watch("edit_address");

  const handleCordinatesChange = (cordinates: GoogleMapProps["cordinates"]) => {
    const detailedAddressComponent =
      cordinates.address?.address_components?.reduce<
        google.maps.places.PlaceResult["address_components"]
      >((acc, current) => {
        if (acc && requirmentForAddressComponent.includes(current.types[0])) {
          acc.push(current);
        }
        return acc;
      }, []);
    const shorterAddress =
      cordinates.address?.address_components
        ?.filter((parts_of_adress) =>
          [
            "route",
            "neighborhood",
            "administrative_area_level_1",
            "country",
          ].includes(parts_of_adress.types[0])
        )
        .map(({ short_name }) => short_name)
        .join(", ") || "";

    handleUpdateFormAndLocalStorage(
      "edit_address",
      {
        formattedAddress: cordinates.address?.formatted_address || "",
        shorterAddress,
        detailedAddressComponent: detailedAddressComponent,
      },
      setValue
    );

    handleUpdateFormAndLocalStorage(
      "edit_cordinates",
      {
        lat: cordinates.lat,
        lng: cordinates.lng,
      },
      setValue
    );

    setEnableConfirmationButton(true);
  };
  const onConfirmation = async () => {
    try {
      await Promise.all([
        updateListing({
          id: listing?.id!,
          data: selectedCordinates!,
          column: "cordinates",
        }),
        updateListing({
          id: listing?.id!,
          data: selectedAddress!,
          column: "address",
        }),
      ]);
      toast.success("Successfully updated.", {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
      setEnableConfirmationButton(false);
      localStorage.removeItem("edit_cordinates");
      localStorage.removeItem("edit_address");
    } catch (error) {
      return toast.error(
        (error as Error).message || "Something went wrong, please try again."
      );
    }
  };

  useEffect(() => {
    setValueRef.current = setValue;
  }, [setValue]);

  useEffect(() => {
    const edit_cordinates = localStorage.getItem("edit_cordinates");
    const edit_address = localStorage.getItem("edit_address");
    if (edit_cordinates && edit_address) {
      setEnableConfirmationButton(true);
      setValueRef.current!("edit_address", JSON.parse(edit_address));
      setValueRef.current!("edit_cordinates", JSON.parse(edit_cordinates));
    } else {
      setValueRef.current!("edit_address", listing?.address);
      setValueRef.current!("edit_cordinates", listing?.cordinates);
    }
  }, [listing]);

  return (
    <>
      <Location
        editPage
        styles={styles}
        setValue={setValueRef.current!}
        register={register}
        selectedCordinates={selectedCordinates}
        onConfirmation={setEnableConfirmationButton}
        handleCordinatesChange={handleCordinatesChange}
        handleUpdateFormAndLocalStorage={handleUpdateFormAndLocalStorage}
      />

      <ConfirmationButton
        onConfirm={onConfirmation}
        enable={enableConfirmationButton}
        position="bottom-right"
      >
        Confirm
      </ConfirmationButton>
    </>
  );
};
