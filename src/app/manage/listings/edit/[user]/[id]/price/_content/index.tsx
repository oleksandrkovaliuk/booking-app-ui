"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useForm, UseFormSetValue } from "react-hook-form";

import { store } from "@/store";
import { requestUpdateListing } from "@/store/api/endpoints/listings/requestUpdateListing";
import { useGetCurrentListingQuery } from "@/store/api/endpoints/listings/getCurrentListing";

import { Price } from "@/app/manage/_components/createForm/content/_components/price";
import { ConfirmationButton } from "@/components/confirmationButton";

import { handleUpdateFormAndLocalStorage } from "@/helpers/updateFormAndStorageStates";

import { ContentProps, EditFormValues } from "../../type";

import styles from "./price.module.scss";

export const PriceContent: React.FC<ContentProps> = ({ params }) => {
  const setValueRef = useRef<UseFormSetValue<EditFormValues> | null>(null);

  const { data: listing } = useGetCurrentListingQuery({
    id: Number(params?.id),
  });

  const [enableConfirmationButton, setEnableConfirmationButton] =
    useState<boolean>(false);

  const { register, watch, setValue } = useForm({
    defaultValues: {
      edit_price: "14",
    } as EditFormValues,
  });

  const selectedPrice = watch("edit_price");

  const onConfirmation = async () => {
    try {
      const { error } = await store.dispatch(
        requestUpdateListing.initiate({
          id: listing?.id!,
          data: selectedPrice!,
          column: "price",
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
      localStorage.removeItem("edit_price");
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
    const edit_price = localStorage.getItem("edit_price");
    if (edit_price) {
      if (Number(JSON.parse(edit_price)?.split(",").join("")) >= 14) {
        setEnableConfirmationButton(true);
      }
      setValueRef.current!("edit_price", JSON.parse(edit_price));
    } else {
      setValueRef.current!(
        "edit_price",
        Number(listing?.price).toLocaleString()
      );
    }
  }, [listing?.price]);

  return (
    <>
      {selectedPrice !== "" &&
        selectedPrice !== undefined &&
        typeof selectedPrice === "string" &&
        !isNaN(Number(selectedPrice.split(",").join(""))) && (
          <Price
            editPage
            styles={styles}
            register={register}
            setValue={setValue}
            selectedPrice={selectedPrice!}
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
