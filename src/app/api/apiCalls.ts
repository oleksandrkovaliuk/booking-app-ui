import {
  FullUserTypes,
  UploadImgProps,
  UserTypes,
} from "@/utilities/interfaces";
import { GET, POST } from "./config";
import { FormState } from "../manage/_components/type";

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

// LISTINGS
export interface ListingState extends FormState {
  id?: number;
  hostemail?: string;
  hostname?: string;
  iscomplete?: boolean;
  disabled_dates?: Date[];
  [key: string]: any;
}
export const GetListingsCategories = () => GET("listings/categories");
export const GetTypeOfPlace = () => GET("listings/typeofplace");
export const GetListings = () => GET("listings/listings");

export const CreateListing = ({
  hostname,
  hostemail,
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
    hostname,
    hostemail,
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
  disabledDates: Date[];
  id: number;
}) => POST("listings/calendar/confirm", { disabledDates, id });
