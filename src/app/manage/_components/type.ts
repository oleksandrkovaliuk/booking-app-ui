import { CreateListingSteps } from "./enums";

import { Category, TypeOfPlace } from "@/store/api/lib/type";
import { GoogleMapProps } from "@/components/googleMap/type";

export interface FormState {
  step?: CreateListingSteps;
  category?: Category | null;
  type?: TypeOfPlace | null;
  cordinates?: GoogleMapProps["cordinates"];
  address: {
    formattedAddress: string;
    shorterAddress: string;
    detailedAddressComponent: google.maps.places.PlaceResult["address_components"];
  };
  guests: number;
  pets_allowed?: boolean;
  accesable?: boolean;
  startingDate?: string;
  images: {
    url: string;
  }[];
  title: string;
  placeis: string;
  aboutplace: string;
  notes: string;
  price: string;
}
