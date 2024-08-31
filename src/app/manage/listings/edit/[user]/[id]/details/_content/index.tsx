"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useForm, UseFormSetValue } from "react-hook-form";

import { useSelector } from "@/store";
import { getCurrentListing } from "@/store/selector/getCurrentListing";
import { getAllListings } from "@/store/thunks/listings/listings";

import { ConfirmationButton } from "@/components/confirmationButton";
import { AdditionalDetails } from "@/app/manage/_components/createForm/content/_components/additionalDetails";

import { updateListing } from "@/app/api/apiCalls";
import { handleUpdateFormAndLocalStorage } from "@/sharing/updateFormAndStorageStates";

import { ContentProps, EditFormValues } from "../../type";

import "../../shared/sharedStyles.scss";
import styles from "./details.module.scss";

export const DetailsContent: React.FC<ContentProps> = ({ params }) => {
  const dispatch = useDispatch();
  const setValueRef = useRef<UseFormSetValue<EditFormValues> | null>(null);

  const listing = useSelector((state) => getCurrentListing(state, params.id));

  const [showConfirmationButton, setShowConfirmationButton] =
    useState<boolean>(false);

  const { register, watch, setValue } = useForm({
    defaultValues: {
      edit_title: listing?.title || "",
      edit_placeis: listing?.placeis || "",
      edit_aboutplace: listing?.aboutplace || "",
      edit_notes: listing?.notes || "",
    } as EditFormValues,
  });

  const selectedTitle = watch("edit_title");
  const selectedPlaceIs = watch("edit_placeis");
  const selectedAboutPlace = watch("edit_aboutplace");
  const selectedNotes = watch("edit_notes");

  const isDataReady = selectedTitle && selectedPlaceIs && selectedAboutPlace;

  const onConfirmation = async () => {
    try {
      await Promise.all([
        updateListing({
          id: listing.id!,
          data: selectedTitle!,
          column: "title",
        }),
        updateListing({
          id: listing.id!,
          data: selectedPlaceIs!,
          column: "placeis",
        }),
        updateListing({
          id: listing.id!,
          data: selectedAboutPlace!,
          column: "aboutplace",
        }),
        updateListing({
          id: listing.id!,
          data: selectedNotes!,
          column: "notes",
        }),
        dispatch(getAllListings() as any),
      ]);
      toast.success("All the details has been updated successfully.");
      setShowConfirmationButton(false);
      localStorage.removeItem("edit_title");
      localStorage.removeItem("edit_placeis");
      localStorage.removeItem("edit_aboutplace");
      localStorage.removeItem("edit_notes");
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
    const edit_title = localStorage.getItem("edit_title");
    const edit_placeis = localStorage.getItem("edit_placeis");
    const edit_aboutplace = localStorage.getItem("edit_aboutplace");
    const edit_notes = localStorage.getItem("edit_notes");

    if (edit_title) {
      setShowConfirmationButton(true);
      setValueRef.current!("edit_title", JSON.parse(edit_title));
    } else {
      setValueRef.current!("edit_title", listing?.title);
    }

    if (edit_placeis) {
      setShowConfirmationButton(true);
      setValueRef.current!("edit_placeis", JSON.parse(edit_placeis));
    } else {
      setValueRef.current!("edit_placeis", listing?.placeis);
    }

    if (edit_aboutplace) {
      setShowConfirmationButton(true);
      setValueRef.current!("edit_aboutplace", JSON.parse(edit_aboutplace));
    } else {
      setValueRef.current!("edit_aboutplace", listing?.aboutplace);
    }

    if (edit_notes) {
      setShowConfirmationButton(true);
      setValueRef.current!("edit_notes", JSON.parse(edit_notes));
    } else {
      setValueRef.current!("edit_notes", listing?.notes);
    }
  }, [listing?.title, listing?.placeis, listing?.aboutplace, listing?.notes]);

  return (
    <>
      {isDataReady && (
        <AdditionalDetails
          editPage
          styles={styles}
          register={register}
          setValue={setValue}
          onConfirmation={setShowConfirmationButton}
          handleUpdateFormAndLocalStorage={handleUpdateFormAndLocalStorage}
        />
      )}
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