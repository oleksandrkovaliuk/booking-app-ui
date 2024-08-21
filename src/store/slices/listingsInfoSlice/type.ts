import { ListingState } from "@/app/api/apiCalls";

export interface Category {
  id: number;
  category_name: string;
  category_icon?: string;
}

export interface TypeOfPlace {
  id: number;
  type_name: string;
  type_img: string;
  type_description: string;
}

export interface State {
  categories: Category[];
  typeOfPlace: TypeOfPlace[];
  listings: ListingState[];
  isLoading: {
    categories: boolean;
    typeOfPlace: boolean;
    listings: boolean;
  };
}
