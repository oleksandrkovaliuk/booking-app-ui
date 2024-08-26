"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Switch } from "@nextui-org/react";
import { useForm, UseFormSetValue } from "react-hook-form";

import {
  appearAnimation,
  deepAppearAnimation,
  motion_transition,
  sloverTransition,
} from "@/app/manage/_components/consts";
import { Counter } from "@/components/counter";
import { ConfirmationButton } from "@/components/confirmationButton";

import { getCurrentListing } from "@/store/selector/getCurrentListing";
import { useSelector } from "@/store";
import { updateListing } from "@/app/api/apiCalls";
import { getAllListings } from "@/store/thunks/listings/listings";

import { handleUpdateFormAndLocalStorage } from "@/sharing/updateFormAndStorageStates";

import { ContentProps, EditFormValues } from "../../type";

import styles from "./basic.module.scss";
import { Basics } from "@/app/manage/_components/createForm/content/_components/basics";

export const BasicContent: React.FC<ContentProps> = ({ params }) => {
  const dispatch = useDispatch();
  const setValueRef = useRef<UseFormSetValue<EditFormValues> | null>(null);

  const listing = useSelector((state) => getCurrentListing(state, params.id));

  const [showConfirmationButton, setShowConfirmationButton] =
    useState<boolean>(false);

  const { register, watch, setValue } = useForm({
    defaultValues: {
      edit_guests: listing?.guests,
      edit_pets_allowed: listing?.pets_allowed,
      edit_accesable: listing?.accesable,
    } as EditFormValues,
  });

  const selectedGuests = watch("edit_guests");
  const selectedPetsAllowed = watch("edit_pets_allowed");
  const selectedAccesable = watch("edit_accesable");

  const onConfirmation = async () => {
    try {
      await Promise.all([
        updateListing({
          id: listing.id!,
          data: selectedGuests!,
          column: "guests",
        }),
        updateListing({
          id: listing.id!,
          data: selectedPetsAllowed!,
          column: "pets_allowed",
        }),
        updateListing({
          id: listing.id!,
          data: selectedAccesable!,
          column: "accesable",
        }),
        dispatch(getAllListings() as any),
      ]);
      toast.success("All the basics has been updated successfully.");
      setShowConfirmationButton(false);
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
        setShowConfirmationButton(true);
        setValueRef.current!("edit_guests", JSON.parse(edit_guests));
      }

      if (edit_pets_allowed) {
        setShowConfirmationButton(true);
        setValueRef.current!(
          "edit_pets_allowed",
          JSON.parse(edit_pets_allowed)
        );
      }

      if (edit_accesable) {
        setShowConfirmationButton(true);
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
