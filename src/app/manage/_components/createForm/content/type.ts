import { UseFormRegister } from "react-hook-form";

import { CreateListingSteps } from "../../enums";
import { FormState, GoogleMapProps } from "../../type";
import { Category, TypeOfPlace } from "@/store/slices/listingsInfoSlice/type";

export interface ContentProps {
  props?: any;
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
  images: { url: string }[];
  typeOfPlace: TypeOfPlace[];
  selectedCategory: Category;
  selectedTypeOfPlace: TypeOfPlace;
  register: UseFormRegister<FormState>;
  selectedCordinates: GoogleMapProps["cordinates"];
  handleCordinatesChange: GoogleMapProps["setCordinates"];
  selectedAccesable: FormState["accesable"];
  selectedPetsAllowed: FormState["pets_allowed"];
  selectedTitle: FormState["title"];
  selectedPlaceIs: FormState["placeis"];
  selectedAboutPlace: FormState["aboutplace"];
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
