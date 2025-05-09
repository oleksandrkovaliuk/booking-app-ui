"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useForm, UseFormSetValue } from "react-hook-form";

import { store } from "@/store";
import { requestUpdateListing } from "@/store/api/endpoints/listings/requestUpdateListing";
import { useGetFullCategoriesListQuery } from "@/store/api/endpoints/listings/getCategories";
import { useGetCurrentListingQuery } from "@/store/api/endpoints/listings/getCurrentListing";

import { ConfirmationButton } from "@/components/confirmationButton";
import { Category } from "@/app/manage/_components/createForm/content/_components/category";

import { handleUpdateFormAndLocalStorage } from "@/helpers/updateFormAndStorageStates";

import { ContentProps, IEditFormValues } from "../../type";

import styles from "./category.module.scss";
import "../../shared/sharedStyles.scss";

export const CategoryPageContent: React.FC<ContentProps> = ({ listing }) => {
  const setValueRef = useRef<UseFormSetValue<IEditFormValues> | null>(null);

  const { data: categories } = useGetFullCategoriesListQuery();

  const [enableConfirmationButton, setEnableConfirmationButton] =
    useState<boolean>(false);

  const { register, watch, setValue } = useForm({
    defaultValues: {
      edit_category: {},
    } as IEditFormValues,
  });

  const selectedCategory = watch("edit_category");

  const onConfirmation = async () => {
    try {
      const { error } = await store.dispatch(
        requestUpdateListing.initiate({
          id: listing?.id!,
          data: selectedCategory!,
          column: "category",
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
      localStorage.removeItem("edit_category");
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
