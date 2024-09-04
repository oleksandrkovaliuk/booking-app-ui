"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useForm, UseFormSetValue } from "react-hook-form";

import { store } from "@/store";
import { requestUpdateListing } from "@/store/api/endpoints/listings/requestUpdateListing";
import { useGetCurrentListingQuery } from "@/store/api/endpoints/listings/getCurrentListing";

import { Images } from "@/app/manage/_components/createForm/content/_components/images/images";
import { ConfirmationButton } from "@/components/confirmationButton";

import { ErrorHandler } from "@/helpers/errorHandler";
import { handleUpdateFormAndLocalStorage } from "@/helpers/updateFormAndStorageStates";

import { ContentProps, EditFormValues } from "../../type";

import "../../shared/sharedStyles.scss";
import styles from "./images.module.scss";
import "@/app/manage/_components/createForm/additionalStyles.scss";

export const ImagesContent: React.FC<ContentProps> = ({ params }) => {
  const setValueRef = useRef<UseFormSetValue<EditFormValues> | null>(null);

  const [enableConfirmationButton, setEnableConfirmationButton] =
    useState<boolean>(false);

  const { data: listing } = useGetCurrentListingQuery({
    id: Number(params?.id),
  });

  const { register, watch, setValue } = useForm({
    defaultValues: {
      edit_images: [],
    } as EditFormValues,
  });

  const selectedImages = watch("edit_images");

  const onConfirmation = async () => {
    try {
      const { error } = await store.dispatch(
        requestUpdateListing.initiate({
          id: listing?.id!,
          data: selectedImages!,
          column: "images",
        })
      );

      if (error) ErrorHandler(error);

      toast.success("Successfully updated.", {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
      setEnableConfirmationButton(false);
      localStorage.removeItem("edit_images");
    } catch (error) {
      toast.error("Something went wrong.", {
        action: {
          label: "Try again",
          onClick: () => onConfirmation(),
        },
      });
    }
  };

  useEffect(() => {
    setValueRef.current = setValue;
  }, [setValue]);

  useEffect(() => {
    const edit_images = localStorage.getItem("edit_images");
    if (edit_images) {
      setEnableConfirmationButton(true);
      setValueRef.current!("edit_images", JSON.parse(edit_images));
    } else {
      setValueRef.current!("edit_images", listing?.images);
    }
  }, [listing?.images]);

  return (
    <>
      {selectedImages && selectedImages.length > 0 && (
        <Images
          editPage
          styles={styles}
          register={register}
          images={selectedImages!}
          setValue={setValueRef.current!}
          selectedAdress={listing?.address}
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
