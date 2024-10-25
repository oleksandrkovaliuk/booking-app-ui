import { UseFormSetValue } from "react-hook-form";

import { IFormState } from "@/app/manage/_components/type";
import { IEditFormValues } from "@/app/manage/listings/edit/[user]/[id]/type";

export const handleUpdateFormAndLocalStorage = (
  name: keyof IFormState | keyof IEditFormValues,
  value: IFormState[keyof IFormState] | IEditFormValues[keyof IEditFormValues],
  setValue: UseFormSetValue<IFormState | IEditFormValues>
) => {
  setValue(name, value);
  localStorage.setItem(name, JSON.stringify(value));
};
