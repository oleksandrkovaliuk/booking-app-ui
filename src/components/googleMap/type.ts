import { Dispatch, SetStateAction } from "react";
import { UseFormRegister } from "react-hook-form";

import { IFormState } from "@/app/manage/_components/type";
import { IEditFormValues } from "@/app/manage/listings/edit/[user]/[id]/type";

export interface IGoogleMapProps {
  isOnlyMap?: boolean;
  cordinates: {
    lat: number;
    lng: number;
    address?: google.maps.places.PlaceResult;
  };
  setCordinates?: ({
    lat,
    lng,
    address,
  }: {
    lat: number;
    lng: number;
    address?: google.maps.places.PlaceResult;
  }) => void;
  editPage?: boolean;
  onConfirmation?: Dispatch<SetStateAction<boolean>>;
  register?: UseFormRegister<IFormState | IEditFormValues>;
}
