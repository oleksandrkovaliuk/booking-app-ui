"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useForm, UseFormSetValue } from "react-hook-form";

import { store } from "@/store";
import { requestUpdateListing } from "@/store/api/endpoints/listings/requestUpdateListing";
import { useGetCurrentListingQuery } from "@/store/api/endpoints/listings/getCurrentListing";

import { ConfirmationButton } from "@/components/confirmationButton";
import { AdditionalDetails } from "@/app/manage/_components/createForm/content/_components/additionalDetails";

import { handleUpdateFormAndLocalStorage } from "@/helpers/updateFormAndStorageStates";

import { ContentProps, IEditFormValues } from "../../type";

import "../../shared/sharedStyles.scss";
import styles from "./details.module.scss";

export const DetailsContent: React.FC<ContentProps> = ({ listing }) => {
  const setValueRef = useRef<UseFormSetValue<IEditFormValues> | null>(null);

  const [enableConfirmationButton, setEnableConfirmationButton] =
    useState<boolean>(false);

  const { register, watch, setValue } = useForm({
    defaultValues: {
      edit_title: "",
      edit_placeis: "",
      edit_aboutplace: "",
      edit_notes: "",
    } as IEditFormValues,
  });

  const selectedTitle = watch("edit_title");
  const selectedPlaceIs = watch("edit_placeis");
  const selectedAboutPlace = watch("edit_aboutplace");
  const selectedNotes = watch("edit_notes");

  const isDataReady = selectedTitle && selectedPlaceIs && selectedAboutPlace;

  const onConfirmation = async () => {
    try {
      await Promise.all([
        store.dispatch(
          requestUpdateListing.initiate({
            id: listing?.id!,
            data: selectedTitle!,
            column: "title",
          })
        ),
        store.dispatch(
          requestUpdateListing.initiate({
            id: listing?.id!,
            data: selectedPlaceIs!,
            column: "placeis",
          })
        ),
        store.dispatch(
          requestUpdateListing.initiate({
            id: listing?.id!,
            data: selectedAboutPlace!,
            column: "aboutplace",
          })
        ),
        store.dispatch(
          requestUpdateListing.initiate({
            id: listing?.id!,
            data: selectedNotes!,
            column: "notes",
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
      setEnableConfirmationButton(true);
      setValueRef.current!("edit_title", JSON.parse(edit_title));
    } else {
      setValueRef.current!("edit_title", listing?.title);
    }

    if (edit_placeis) {
      setEnableConfirmationButton(true);
      setValueRef.current!("edit_placeis", JSON.parse(edit_placeis));
    } else {
      setValueRef.current!("edit_placeis", listing?.placeis);
    }

    if (edit_aboutplace) {
      setEnableConfirmationButton(true);
      setValueRef.current!("edit_aboutplace", JSON.parse(edit_aboutplace));
    } else {
      setValueRef.current!("edit_aboutplace", listing?.aboutplace);
    }

    if (edit_notes) {
      setEnableConfirmationButton(true);
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
          onConfirmation={setEnableConfirmationButton}
          handleUpdateFormAndLocalStorage={handleUpdateFormAndLocalStorage}
        />
      )}
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
