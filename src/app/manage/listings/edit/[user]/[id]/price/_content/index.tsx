"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useForm, UseFormSetValue } from "react-hook-form";

import { useSelector } from "@/store";
import { getAllListings } from "@/store/thunks/listings/listings";
import { getCurrentUserListings } from "@/store/thunks/listings/getCurrentUserListing";

import { Price } from "@/app/manage/_components/createForm/content/_components/price";
import { updateListing } from "@/app/api/apiCalls";

import { ConfirmationButton } from "@/components/confirmationButton";
import { handleUpdateFormAndLocalStorage } from "@/sharing/updateFormAndStorageStates";

import { ContentProps, EditFormValues } from "../../type";

import styles from "./price.module.scss";

export const PriceContent: React.FC<ContentProps> = ({ params }) => {
  const dispatch = useDispatch();
  const setValueRef = useRef<UseFormSetValue<EditFormValues> | null>(null);

  const listing = useSelector((state) => state.listingsInfo.listings[0]);

  const [enableConfirmationButton, setEnableConfirmationButton] =
    useState<boolean>(false);

  const { register, watch, setValue } = useForm({
    defaultValues: {
      edit_price: listing?.price,
    } as EditFormValues,
  });

  const selectedPrice = watch("edit_price");

  const onConfirmation = async () => {
    try {
      await Promise.all([
        updateListing({
          id: listing.id!,
          data: selectedPrice!,
          column: "price",
        }),
        dispatch(getAllListings() as any),
      ]);
      toast.success("Successfully updated.", {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
      setEnableConfirmationButton(false);
      localStorage.removeItem("edit_price");
    } catch (error) {
      return toast.error(
        (error as Error).message || "Something went wrong, please try again."
      );
    }
  };

  useEffect(() => {
    dispatch(
      getCurrentUserListings({
        id: Number(params.id),
        user_name: params.user,
      }) as any
    );
  }, []);

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
