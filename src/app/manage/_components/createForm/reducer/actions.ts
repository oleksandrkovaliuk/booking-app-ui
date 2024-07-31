import { GoogleMapProps } from "../createForm";
import { CreateListingSteps } from "../type";
import { ActionTypes } from "./type";
import { Category, TypeOfPlace } from "@/store/reducers/listingsReducer";

type ValueOrUpdater<T> = T | ((prev: T) => T);

export const setFormStep = (
  value: ValueOrUpdater<CreateListingSteps | number>
) => ({
  type: ActionTypes.SET_FORM_STEP,
  payload: value,
});

export const setSelectedCategories = (
  value: ValueOrUpdater<Category | null>
) => ({
  type: ActionTypes.SET_SELECTED_CATEGORIES,
  payload: value,
});

export const setSelectedTypeOfPlace = (
  value: ValueOrUpdater<TypeOfPlace | null>
) => ({
  type: ActionTypes.SET_SELECTED_TYPE_OF_PLACE,
  payload: value,
});

export const setSelectedCordinates = (
  value: GoogleMapProps["cordinates"] | null
) => ({
  type: ActionTypes.SET_SELECTED_CORDINATES,
  payload: value,
});

export const setAmoutOfGuests = (value: (prev: number) => number) => ({
  type: ActionTypes.SET_AMOUT_OF_GUESTS,
  payload: value,
});
