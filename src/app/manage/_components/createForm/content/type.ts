import { Category, TypeOfPlace } from "@/store/reducers/listingsReducer";
import { CreateListingSteps } from "../../enums";
import { UseFormRegister } from "react-hook-form";
import { FormState, GoogleMapProps } from "../../type";

export interface ContentProps {
  key: CreateListingSteps;
  type: CreateListingSteps;
  props?: any;
  [key: string]: any;
  isLoading: boolean;
  categories: Category[];
  typeOfPlace: TypeOfPlace[];
  register: UseFormRegister<FormState>;
  selectedCategory: Category;
  selectedTypeOfPlace: TypeOfPlace;
  selectedCordinates: GoogleMapProps["cordinates"];
  selectedGuests: number;
  selectedAdditionalDetails: FormState["additionalDetails"];
  handleCordinatesChange: GoogleMapProps["setCordinates"];
  handleImagesUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateFormAndLocalStorage: (
    key: keyof FormState,
    value: FormState[keyof FormState]
  ) => void;
}
