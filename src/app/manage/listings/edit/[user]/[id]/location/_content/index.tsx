"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useForm, UseFormSetValue } from "react-hook-form";

import { useSelector } from "@/store";
import { getCurrentListing } from "@/store/selector/getCurrentListing";

import { updateListing } from "@/app/api/apiCalls";
import { getAllListings } from "@/store/thunks/listings/listings";
import { handleUpdateFormAndLocalStorage } from "@/sharing/updateFormAndStorageStates";

import {
  appearAnimation,
  motion_transition,
} from "@/app/manage/_components/consts";
import { GoogleMap } from "@/app/manage/_components/googleMap/googleMap";
import { ConfirmationButton } from "@/components/confirmationButton";

import { ContentProps, EditFormValues } from "../../type";
import { GoogleMapProps } from "@/app/manage/_components/type";

import styles from "./location.module.scss";
import "../../shared/sharedStyles.scss";
import { Location } from "@/app/manage/_components/createForm/content/_components/location";

export const LocationContent: React.FC<ContentProps> = ({ params }) => {
  const dispatch = useDispatch();
  const setValueRef = useRef<UseFormSetValue<EditFormValues> | null>(null);

  const listing = useSelector((state) => getCurrentListing(state, params.id));

  const [showConfirmationButton, setShowConfirmationButton] =
    useState<boolean>(false);

  const { register, watch, setValue } = useForm({
    defaultValues: {
      edit_cordinates: listing?.cordinates,
      edit_address: listing?.address,
    } as EditFormValues,
  });

  const selectedCordinates = watch("edit_cordinates");
  const selectedAddress = watch("edit_address");

  const handleCordinatesChange = (cordinates: GoogleMapProps["cordinates"]) => {
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

    setShowConfirmationButton(true);
  };
  const onConfirmation = async () => {
    try {
      await Promise.all([
        updateListing({
          id: listing.id!,
          data: selectedCordinates!,
          column: "cordinates",
        }),
        updateListing({
          id: listing.id!,
          data: selectedAddress!,
          column: "address",
        }),
        dispatch(getAllListings() as any),
      ]);
      toast.success("Listing location has been updated successfully.");
      setShowConfirmationButton(false);
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
      setShowConfirmationButton(true);
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
        onConfirmation={setShowConfirmationButton}
        handleCordinatesChange={handleCordinatesChange}
        handleUpdateFormAndLocalStorage={handleUpdateFormAndLocalStorage}
      />

      <ConfirmationButton
        onConfirm={onConfirmation}
        trigger={showConfirmationButton}
        position="bottom-right"
      >
        Confirm
      </ConfirmationButton>
    </>
  );
};
