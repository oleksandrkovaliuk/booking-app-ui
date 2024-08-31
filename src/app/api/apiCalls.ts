import {
  FullUserTypes,
  ShowCaseUser,
  UploadImgProps,
  UserTypes,
} from "@/_utilities/interfaces";
import { GET, POST } from "./config";
import { FormState } from "../manage/_components/type";
import { DateValue } from "@nextui-org/calendar";

// AUTH
export const AccessUser = ({ email, password }: UserTypes) =>
  POST("auth/accessUser", { email, password });
export const InsertOAuthUser = ({
  email,
  user_name,
  user_lastname,
  img_url,
  provider,
}: FullUserTypes) =>
  POST("auth/oauthUser", {
    email,
    user_name,
    user_lastname,
    img_url,
    provider,
  });
export const CheckAuthType = ({ email }: { email: string }) =>
  POST("auth/checkAuthType", { email });

// USER
export const GetUser = ({
  user_name,
  user_email,
}: {
  user_name: string;
  user_email: string;
}) => GET(`user/get/${user_email}/${user_name}`);

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
export const GetListingsCategories = () => GET("listings/categories");
export const GetTypeOfPlace = () => GET("listings/typeofplace");
export const GetListings = () => GET("listings/listings");

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
