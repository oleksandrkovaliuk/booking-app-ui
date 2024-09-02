"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useForm, UseFormSetValue } from "react-hook-form";

import { useGetCurrentListingQuery } from "@/store/api/endpoints/listings/getCurrentListing";

import { Images } from "@/app/manage/_components/createForm/content/_components/images/images";
import { ConfirmationButton } from "@/components/confirmationButton";

import { updateListing } from "@/app/api/apiCalls";
import { handleUpdateFormAndLocalStorage } from "@/helpers/updateFormAndStorageStates";

import { ContentProps, EditFormValues } from "../../type";

import "../../shared/sharedStyles.scss";
import styles from "./images.module.scss";
import "@/app/manage/_components/createForm/additionalStyles.scss";

export const ImagesContent: React.FC<ContentProps> = ({ params }) => {
  const setValueRef = useRef<UseFormSetValue<EditFormValues> | null>(null);

  const { data: listing } = useGetCurrentListingQuery({
    id: Number(params?.id),
  });

  const [enableConfirmationButton, setEnableConfirmationButton] =
    useState<boolean>(false);

  const { register, watch, setValue } = useForm({
    defaultValues: {
      edit_images: listing?.images || [],
    } as EditFormValues,
  });

  const selectedImages = watch("edit_images");

  const onConfirmation = async () => {
    try {
      await Promise.all([
        updateListing({
          id: listing?.id!,
          data: selectedImages!,
          column: "images",
        }),
      ]);
      toast.success("Successfully updated.", {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
      setEnableConfirmationButton(false);
      localStorage.removeItem("edit_images");
    } catch (error) {
      console.log(error);
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
