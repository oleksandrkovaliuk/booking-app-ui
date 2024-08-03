import { UseFormRegister } from "react-hook-form";
import { CreateListingSteps } from "./enums";
import { Category, TypeOfPlace } from "@/store/reducers/listingsReducer";

export interface FormState {
  step?: CreateListingSteps;
  category?: Category | null;
  typeOfPlace?: TypeOfPlace | null;
  cordinates?: GoogleMapProps["cordinates"];
  address: string;
  amoutOfPeople?: number;
  guests: number;
  additionalDetails?: {
    pets: boolean;
    accesable: boolean;
  };
  startingDate?: string;
  images?: string[];
}
export interface GoogleMapProps {
  cordinates: { lat: number; lng: number; name?: string };
  setCordinates: ({
    lat,
    lng,
    name,
  }: {
    lat: number;
    lng: number;
    name: string;
  }) => void;
  register: UseFormRegister<FormState>;
}
