"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useForm, UseFormSetValue } from "react-hook-form";

import { useSelector } from "@/store";
import { getCurrentListing } from "@/store/selector/getCurrentListing";
import { getAllListings } from "@/store/thunks/listings/listings";

import { Images } from "@/app/manage/_components/createForm/content/_components/images/images";
import { ConfirmationButton } from "@/components/confirmationButton";

import { updateListing } from "@/app/api/apiCalls";
import { handleUpdateFormAndLocalStorage } from "@/sharing/updateFormAndStorageStates";

import { ContentProps, EditFormValues } from "../../type";

import "../../shared/sharedStyles.scss";
import styles from "./images.module.scss";
import "@/app/manage/_components/createForm/additionalStyles.scss";

export const ImagesContent: React.FC<ContentProps> = ({ params }) => {
  const dispatch = useDispatch();
  const setValueRef = useRef<UseFormSetValue<EditFormValues> | null>(null);
  const listing = useSelector((state) => getCurrentListing(state, params.id));

  const [showConfirmationButton, setShowConfirmationButton] =
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
          id: listing.id!,
          data: selectedImages!,
          column: "images",
        }),
        dispatch(getAllListings() as any),
      ]);
      toast.success("Images has been updated successfully.");
      setShowConfirmationButton(false);
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
      setShowConfirmationButton(true);
      setValueRef.current!("edit_images", JSON.parse(edit_images));
    } else {
      setValueRef.current!("edit_images", listing?.images);
    }
  }, [listing?.images]);

  return (
    <>
      {selectedImages && (
        <Images
          editPage
          styles={styles}
          register={register}
          images={selectedImages!}
          setValue={setValueRef.current!}
          selectedAdress={listing?.address}
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
