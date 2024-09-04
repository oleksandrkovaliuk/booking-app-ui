"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useForm, UseFormSetValue } from "react-hook-form";

import { store } from "@/store";
import { requestUpdateListing } from "@/store/api/endpoints/listings/requestUpdateListing";
import { useGetCurrentListingQuery } from "@/store/api/endpoints/listings/getCurrentListing";

import { ConfirmationButton } from "@/components/confirmationButton";
import { Basics } from "@/app/manage/_components/createForm/content/_components/basics";

import { handleUpdateFormAndLocalStorage } from "@/helpers/updateFormAndStorageStates";

import { ContentProps, EditFormValues } from "../../type";

import styles from "./basic.module.scss";

export const BasicContent: React.FC<ContentProps> = ({ params }) => {
  const setValueRef = useRef<UseFormSetValue<EditFormValues> | null>(null);

  const { data: listing } = useGetCurrentListingQuery({
    id: Number(params?.id),
  });

  const [enableConfirmationButton, setEnableConfirmationButton] =
    useState(true);

  const { register, watch, setValue } = useForm({
    defaultValues: {
      edit_guests: 0,
      edit_pets_allowed: false,
      edit_accesable: false,
    } as EditFormValues,
  });

  const selectedGuests = watch("edit_guests");
  const selectedPetsAllowed = watch("edit_pets_allowed");
  const selectedAccesable = watch("edit_accesable");

  const onConfirmation = async () => {
    try {
      await Promise.all([
        store.dispatch(
          requestUpdateListing.initiate({
            id: listing?.id!,
            data: selectedGuests!,
            column: "guests",
          })
        ),
        store.dispatch(
          requestUpdateListing.initiate({
            id: listing?.id!,
            data: selectedPetsAllowed!,
            column: "pets_allowed",
          })
        ),
        store.dispatch(
          requestUpdateListing.initiate({
            id: listing?.id!,
            data: selectedAccesable!,
            column: "accesable",
          })
        ),
      ]);

      toast.success("Successfully updated.", {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
      setEnableConfirmationButton(false);
      localStorage.removeItem("edit_guests");
      localStorage.removeItem("edit_pets_allowed");
      localStorage.removeItem("edit_accesable");
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
    const edit_guests = localStorage.getItem("edit_guests");
    const edit_pets_allowed = localStorage.getItem("edit_pets_allowed");
    const edit_accesable = localStorage.getItem("edit_accesable");

    if (!listing) {
      if (edit_guests) {
        setEnableConfirmationButton(true);
        setValueRef.current!("edit_guests", JSON.parse(edit_guests));
      }

      if (edit_pets_allowed) {
        setEnableConfirmationButton(true);
        setValueRef.current!(
          "edit_pets_allowed",
          JSON.parse(edit_pets_allowed)
        );
      }

      if (edit_accesable) {
        setEnableConfirmationButton(true);
        setValueRef.current!("edit_accesable", JSON.parse(edit_accesable));
      }
    } else {
      setValueRef.current!("edit_guests", listing?.guests);
      setValueRef.current!("edit_pets_allowed", listing?.pets_allowed);
      setValueRef.current!("edit_accesable", listing?.accesable);
    }
  }, [listing]);

  return (
    <>
      <Basics
        editPage
        styles={styles}
        register={register}
        setValue={setValueRef.current!}
        selectedGuests={selectedGuests}
        selectedAccesable={selectedAccesable}
        selectedPetsAllowed={selectedPetsAllowed}
        onConfirmation={setEnableConfirmationButton}
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
