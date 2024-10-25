"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useForm, UseFormSetValue } from "react-hook-form";

import { store } from "@/store";
import { requestUpdateListing } from "@/store/api/endpoints/listings/requestUpdateListing";
import { useGetCurrentListingQuery } from "@/store/api/endpoints/listings/getCurrentListing";
import { useGetListingsTypeOfPlaceQuery } from "@/store/api/endpoints/listings/getTypeOfPlace";

import { ConfirmationButton } from "@/components/confirmationButton";

import { TypeOfPlace } from "@/app/manage/_components/createForm/content/_components/typeOfPlace";

import { handleUpdateFormAndLocalStorage } from "@/helpers/updateFormAndStorageStates";

import { ContentProps, IEditFormValues } from "../../type";

import styles from "./type.module.scss";
import "../../shared/sharedStyles.scss";

export const TypeContent: React.FC<ContentProps> = ({ params }) => {
  const setValueRef = useRef<UseFormSetValue<IEditFormValues> | null>(null);

  const { data: typeOfPlace } = useGetListingsTypeOfPlaceQuery();
  const { data: listing } = useGetCurrentListingQuery({
    id: Number(params?.id),
  });

  const [enableConfirmationButton, setEnableConfirmationButton] =
    useState<boolean>(false);

  const { register, watch, setValue } = useForm({
    defaultValues: {
      edit_type: {},
    } as IEditFormValues,
  });

  const selectedTypeOfPlace = watch("edit_type");

  const onConfirmation = async () => {
    try {
      const { error } = await store.dispatch(
        requestUpdateListing.initiate({
          id: listing?.id!,
          data: selectedTypeOfPlace!,
          column: "type",
        })
      );

      if (error) throw new Error();

      toast.success("Successfully updated.", {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
      setEnableConfirmationButton(false);
      localStorage.removeItem("edit_type");
    } catch (error) {
      toast.error(
        (error as Error).message || "Something went wrong, please try again.",
        {
          action: {
            label: "Close",
            onClick: () => {},
          },
        }
      );
    }
  };

  useEffect(() => {
    setValueRef.current = setValue;
  }, [setValue]);

  useEffect(() => {
    const edit_type = localStorage.getItem("edit_type");
    if (edit_type) {
      setEnableConfirmationButton(true);
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
