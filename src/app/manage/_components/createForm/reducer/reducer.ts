import { Category, TypeOfPlace } from "@/store/reducers/listingsReducer";
import { CreateListingSteps } from "../type";
import { ActionTypes } from "./type";
import { GoogleMapProps } from "../createForm";

export const InitialState = {
  formStep: 0 as CreateListingSteps | number,
  selectedCategories: null as Category | null,
  selectedTypeOfPlace: null as TypeOfPlace | null,
  selectedCordinates: null as GoogleMapProps["cordinates"] | null,
  amoutOfGuests: 1 as number,
};

export const reducer = (state = InitialState, action: any) => {
  switch (action.type) {
    case ActionTypes.SET_FORM_STEP:
      return {
        ...state,
        formStep:
          typeof action.payload === "function"
            ? action.payload(state.formStep)
            : action.payload,
      };
    case ActionTypes.SET_SELECTED_CATEGORIES:
      return {
        ...state,
        selectedCategories:
          typeof action.payload === "function"
            ? action.payload(state.selectedCategories)
            : action.payload,
      };
    case ActionTypes.SET_SELECTED_TYPE_OF_PLACE:
      return {
        ...state,
        selectedTypeOfPlace:
          typeof action.payload === "function"
            ? action.payload(state.selectedTypeOfPlace)
            : action.payload,
      };
    case ActionTypes.SET_SELECTED_CORDINATES:
      return {
        ...state,
        selectedCordinates:
          typeof action.payload === "function"
            ? action.payload(state.selectedCordinates)
            : action.payload,
      };
    case ActionTypes.SET_AMOUT_OF_GUESTS:
      return {
        ...state,
        amoutOfGuests:
          typeof action.payload === "function"
            ? action.payload(state.amoutOfGuests)
            : action.payload,
      };
    default:
      return InitialState;
  }
};
