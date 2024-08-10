import { UseFormRegister } from "react-hook-form";
import { CreateListingSteps } from "./enums";
import { Category, TypeOfPlace } from "@/store/reducers/listingsReducer";

export interface FormState {
  step?: CreateListingSteps;
  category?: Category | null;
  typeOfPlace?: TypeOfPlace | null;
  cordinates?: GoogleMapProps["cordinates"];
  address: {
    formattedAddress: string;
    shorterAddress: string;
  };
  amoutOfPeople?: number;
  guests: number;
  additionalDetails?: {
    pets: boolean;
    accesable: boolean;
  };
  startingDate?: string;
  images: string[];
  title: string;
  placeis: string;
  aboutplace: string;
  notes: string;
  price: string;
}
export interface GoogleMapProps {
  cordinates: {
    lat: number;
    lng: number;
    address?: google.maps.places.PlaceResult;
  };
  setCordinates: ({
    lat,
    lng,
    address,
  }: {
    lat: number;
    lng: number;
    address?: google.maps.places.PlaceResult;
  }) => void;
  register: UseFormRegister<FormState>;
}
