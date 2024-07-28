import { FullUserTypes, UserTypes } from "@/utilities/interfaces";
import { GET, POST } from "./config";

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

export const GetListingsCategories = () => GET("listings/categories");
export const GetTypeOfPlace = () => GET("listings/typeofplace");
