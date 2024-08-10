import { Category, TypeOfPlace } from "@/store/reducers/listingsReducer";
import { CreateListingSteps } from "../../enums";
import { UseFormRegister } from "react-hook-form";
import { FormState, GoogleMapProps } from "../../type";

export interface ContentProps {
  props?: any;
  images: string[];
  [key: string]: any;
  selectedPrice: string;
  categories: Category[];
  selectedAdress: string;
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
  handleUpdateFormAndLocalStorage: (
    key: keyof FormState,
    value: FormState[keyof FormState]
  ) => void;
}
export interface ImagesType {
  images: string[];
}

export interface ImagesStoreType extends ImagesType {
  isImagesReady: boolean;
}
