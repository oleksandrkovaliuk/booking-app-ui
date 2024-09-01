"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useForm, UseFormSetValue } from "react-hook-form";

import { ContentProps, EditFormValues } from "../../type";

import { useSelector } from "@/store";
import { getAllListings } from "@/store/thunks/listings/listings";

import { ConfirmationButton } from "@/components/confirmationButton";
import { Category } from "@/app/manage/_components/createForm/content/_components/category";
import { handleUpdateFormAndLocalStorage } from "@/sharing/updateFormAndStorageStates";

import { updateListing } from "@/app/api/apiCalls";

import styles from "./category.module.scss";
import "../../shared/sharedStyles.scss";
import { getCurrentUserListings } from "@/store/thunks/listings/getCurrentUserListing";

export const CategoryPageContent: React.FC<ContentProps> = ({ params }) => {
  const dispatch = useDispatch();
  const setValueRef = useRef<UseFormSetValue<EditFormValues> | null>(null);

  const { categories } = useSelector((state) => state.listingsInfo);
  const listing = useSelector((state) => state.listingsInfo.listings[0]);

  const [enableConfirmationButton, setEnableConfirmationButton] =
    useState<boolean>(false);

  const { register, watch, setValue } = useForm({
    defaultValues: {
      edit_category: listing?.category,
    } as EditFormValues,
  });

  const selectedCategory = watch("edit_category");

  const onConfirmation = async () => {
    try {
      await Promise.all([
        updateListing({
          id: listing.id!,
          data: selectedCategory!,
          column: "category",
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
      localStorage.removeItem("edit_category");
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
    const edit_category = localStorage.getItem("edit_category");
    if (edit_category) {
      setEnableConfirmationButton(true);
      setValueRef.current!("edit_category", JSON.parse(edit_category));
    } else {
      setValueRef.current!("edit_category", listing?.category);
    }
  }, [listing?.category]);

  return (
    <>
      <Category
        editPage
        styles={styles}
        register={register}
        categories={categories}
        setValue={setValueRef.current!}
        selectedCategory={selectedCategory!}
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
