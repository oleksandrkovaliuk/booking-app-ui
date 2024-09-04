import { Dispatch, SetStateAction } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

import { Category, TypeOfPlace } from "@/store/api/lib/type";

import { EditFormValues } from "@/app/manage/listings/edit/[user]/[id]/type";
import { GoogleMapProps } from "@/components/googleMap/type";

import { CreateListingSteps } from "../../enums";
import { FormState } from "../../type";

export interface ContentProps {
  props?: any;
  editPage?: boolean;
  onConfirmation?: Dispatch<SetStateAction<boolean>>;
  [key: string]: any;
  setValue: UseFormSetValue<FormState | any>;
  selectedPrice?: string;
  categories?: Category[];
  selectedAdress?: {
    formattedAddress: string;
    shorterAddress: string;
  };
  selectedGuests?: number;
  key?: CreateListingSteps;
  type?: CreateListingSteps;
  images?: { url: string }[];
  typeOfPlace?: TypeOfPlace[];
  selectedCategory?: Category;
  selectedTypeOfPlace?: TypeOfPlace;
  register: UseFormRegister<FormState | EditFormValues>;
  selectedCordinates?: GoogleMapProps["cordinates"];
  handleCordinatesChange?: GoogleMapProps["setCordinates"];
  selectedAccesable?: FormState["accesable"];
  selectedPetsAllowed?: FormState["pets_allowed"];
  selectedTitle?: FormState["title"];
  selectedPlaceIs?: FormState["placeis"];
  selectedAboutPlace?: FormState["aboutplace"];
  selectedNotes?: FormState["notes"];
  handleUpdateFormAndLocalStorage: (
    key: keyof FormState | keyof EditFormValues,
    value: FormState[keyof FormState] | EditFormValues[keyof EditFormValues],
    setValue: UseFormSetValue<FormState | EditFormValues>
  ) => void;
}
export interface ImagesType {
  images: {
    url: string;
  }[];
}

export interface ImagesStoreType extends ImagesType {
  isImagesReady: boolean;
}
