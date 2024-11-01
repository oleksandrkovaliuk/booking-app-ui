import { CreateListingSteps } from "./enums";

import { ICategory, ITypeOfPlace } from "@/store/api/lib/interfaces";
import { IGoogleMapProps } from "@/components/googleMap/type";

export interface IFormState {
  step?: CreateListingSteps;
  category?: ICategory | null;
  type?: ITypeOfPlace | null;
  cordinates?: IGoogleMapProps["cordinates"];
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
