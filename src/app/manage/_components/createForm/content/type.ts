import { Dispatch, SetStateAction } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

import { IFormState } from "../../type";
import { CreateListingSteps } from "../../enums";
import { IGoogleMapProps } from "@/components/googleMap/type";
import { ICategory, ITypeOfPlace } from "@/store/api/lib/interfaces";
import { IEditFormValues } from "@/app/manage/listings/edit/[user]/[id]/type";

export interface ContentProps {
  props?: any;
  editPage?: boolean;
  onConfirmation?: Dispatch<SetStateAction<boolean>>;
  [key: string]: any;
  setValue: UseFormSetValue<IFormState | any>;
  selectedPrice?: string;
  categories?: ICategory[];
  selectedAdress?: {
    formattedAddress: string;
    shorterAddress: string;
    detailedAddressComponent: google.maps.places.PlaceResult["address_components"];
  };
  selectedGuests?: number;
  key?: CreateListingSteps;
  type?: CreateListingSteps;
  images?: { url: string }[];
  typeOfPlace?: ITypeOfPlace[];
  selectedCategory?: ICategory;
  selectedTypeOfPlace?: ITypeOfPlace;
  register: UseFormRegister<IFormState | IEditFormValues>;
  selectedCordinates?: IGoogleMapProps["cordinates"];
  handleCordinatesChange?: IGoogleMapProps["setCordinates"];
  selectedAccesable?: IFormState["accesable"];
  selectedPetsAllowed?: IFormState["pets_allowed"];
  selectedTitle?: IFormState["title"];
  selectedPlaceIs?: IFormState["placeis"];
  selectedAboutPlace?: IFormState["aboutplace"];
  selectedNotes?: IFormState["notes"];
  handleUpdateFormAndLocalStorage: (
    key: keyof IFormState | keyof IEditFormValues,
    value:
      | IFormState[keyof IFormState]
      | IEditFormValues[keyof IEditFormValues],
    setValue: UseFormSetValue<IFormState | IEditFormValues>
  ) => void;
}
export interface ImagesInterface {
  images: {
    url: string;
  }[];
}

export interface IimagesStore extends ImagesInterface {
  isImagesReady: boolean;
}
