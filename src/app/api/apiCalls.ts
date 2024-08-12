import { FullUserTypes, UserTypes } from "@/utilities/interfaces";
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
  hostemail: string;
  hostname: string;
  [key: string]: any;
}
export const GetListingsCategories = () => GET("listings/categories");
export const GetTypeOfPlace = () => GET("listings/typeofplace");
export const GetListings = () => GET("listings/listings");
export const CreateListing = ({
  hostname,
  hostemail,
  category,
  typeOfPlace,
  cordinates,
  address,
  guests,
  additionalDetails,
  images,
  title,
  aboutPlace,
  placeIs,
  notes,
  price,
}: ListingState) =>
  POST("listings/createListing", {
    hostname,
    hostemail,
    category,
    typeOfPlace,
    cordinates,
    address,
    guests,
    additionalDetails,
    images,
    title,
    aboutPlace,
    placeIs,
    notes,
    price,
  });
