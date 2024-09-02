import { POST } from "./config";
import { FormState } from "../manage/_components/type";
import { DateValue } from "@nextui-org/calendar";

// LISTINGS
export interface ListingState extends FormState {
  id?: number;
  host_id?: number;
  host_email?: string;
  host_name?: string;
  iscomplete?: boolean;
  disabled_dates?: DateValue[];
  [key: string]: any;
}

export const CreateListing = ({
  host_name,
  host_email,
  category,
  type,
  cordinates,
  address,
  guests,
  pets_allowed,
  accesable,
  images,
  title,
  aboutplace,
  placeis,
  notes,
  price,
}: ListingState) =>
  POST("listings/createListing", {
    host_name,
    host_email,
    category,
    type,
    cordinates,
    address,
    guests,
    pets_allowed,
    accesable,
    images,
    title,
    aboutplace,
    placeis,
    notes,
    price,
  });

export const DeleteListing = (id: number) =>
  POST("listings/deleteListing", { id });

// IMAGES
export const UploadListingImages = (formData: FormData, way: string) =>
  POST("listings/images/upload", formData, way);

export const DeleteUserListingImages = ({
  user_email,
  location,
}: {
  user_email: string;
  location: string;
}) => POST("listings/images/delete", { user_email, location });

export const DeleteListingIndividualImage = ({
  user_email,
  location,
  image,
}: {
  user_email: string;
  location: string;
  image: string;
}) => POST("listings/images/deleteIndividual", { user_email, location, image });

// CALENDAR
export const SetDisabledDates = ({
  disabledDates,
  id,
}: {
  disabledDates: DateValue[];
  id: number;
}) => POST("listings/calendar/confirm", { disabledDates, id });

export const updateListing = ({
  column,
  data,
  id,
}: {
  column: string;
  data: FormState[keyof FormState];
  id: number;
}) => {
  return POST(`listings/update`, { column, data, id });
};
