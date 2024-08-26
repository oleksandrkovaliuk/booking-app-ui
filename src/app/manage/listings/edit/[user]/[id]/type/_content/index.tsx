"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useForm, UseFormSetValue } from "react-hook-form";
import { motion } from "framer-motion";

import { useSelector } from "@/store";
import { getAllListings } from "@/store/thunks/listings/listings";
import { getCurrentListing } from "@/store/selector/getCurrentListing";

import { ConfirmationButton } from "@/components/confirmationButton";

import { TypeOfPlace } from "@/app/manage/_components/createForm/content/_components/typeOfPlace";
import { updateListing } from "@/app/api/apiCalls";
import { handleUpdateFormAndLocalStorage } from "@/sharing/updateFormAndStorageStates";

import { ContentProps, EditFormValues } from "../../type";

import styles from "./type.module.scss";
import "../../shared/sharedStyles.scss";

export const TypeContent: React.FC<ContentProps> = ({ params }) => {
  const dispatch = useDispatch();
  const setValueRef = useRef<UseFormSetValue<EditFormValues> | null>(null);

  const { typeOfPlace } = useSelector((state) => state.listingsInfo);
  const listing = useSelector((state) => getCurrentListing(state, params.id));

  const [showConfirmationButton, setShowConfirmationButton] =
    useState<boolean>(false);

  const { register, watch, setValue } = useForm({
    defaultValues: {
      edit_type: listing?.type,
    } as EditFormValues,
  });

  const selectedTypeOfPlace = watch("edit_type");

  const onConfirmation = async () => {
    try {
      await Promise.all([
        updateListing({
          id: listing.id!,
          data: selectedTypeOfPlace!,
          column: "type",
        }),
        dispatch(getAllListings() as any),
      ]);
      toast.success("Type of place has been updated successfully.");
      setShowConfirmationButton(false);
      localStorage.removeItem("edit_type");
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
    const edit_type = localStorage.getItem("edit_type");
    if (edit_type) {
      setShowConfirmationButton(true);
      setValueRef.current!("edit_type", JSON.parse(edit_type));
    } else {
      setValueRef.current!("edit_type", listing?.type);
    }
  }, [listing?.type]);

  return (
    <>
      <TypeOfPlace
        editPage
        styles={styles}
        setValue={setValueRef.current!}
        register={register}
        typeOfPlace={typeOfPlace}
        selectedTypeOfPlace={selectedTypeOfPlace!}
        onConfirmation={setShowConfirmationButton}
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
