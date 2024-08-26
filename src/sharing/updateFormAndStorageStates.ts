import { FormState } from "@/app/manage/_components/type";
import { EditFormValues } from "@/app/manage/listings/edit/[user]/[id]/type";
import { UseFormSetValue } from "react-hook-form";

export const handleUpdateFormAndLocalStorage = (
  name: keyof FormState | keyof EditFormValues,
  value: FormState[keyof FormState] | EditFormValues[keyof EditFormValues],
  setValue: UseFormSetValue<FormState | EditFormValues>
) => {
  setValue(name, value);
  localStorage.setItem(name, JSON.stringify(value));
};
