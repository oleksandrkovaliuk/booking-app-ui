import { UseFormRegister } from "react-hook-form";

import { CreateListingSteps } from "../../enums";
import { FormState, GoogleMapProps } from "../../type";
import { Category, TypeOfPlace } from "@/store/slices/listingsInfoSlice/type";

export interface ContentProps {
  props?: any;
  images: { url: string }[];
  [key: string]: any;
  selectedPrice: string;
  categories: Category[];
  selectedAdress: {
    formattedAddress: string;
    shorterAddress: string;
  };
  selectedGuests: number;
  key: CreateListingSteps;
  type: CreateListingSteps;
  typeOfPlace: TypeOfPlace[];
  selectedCategory: Category;
  selectedTypeOfPlace: TypeOfPlace;
  register: UseFormRegister<FormState>;
  selectedCordinates: GoogleMapProps["cordinates"];
  handleCordinatesChange: GoogleMapProps["setCordinates"];
  selectedAdditionalDetails: FormState["additionalDetails"];
  selectedTitle: FormState["title"];
  selectedPlaceIs: FormState["placeIs"];
  selectedAboutPlace: FormState["aboutPlace"];
  selectedNotes: FormState["notes"];
  handleUpdateFormAndLocalStorage: (
    key: keyof FormState,
    value: FormState[keyof FormState]
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
