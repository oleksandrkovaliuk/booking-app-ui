import { POST } from "../apiConfig";
import { ApiUrlsAuth } from "@/store/api/lib/constants";
import { IFullIUserTypes, IUserTypes } from "@/_utilities/interfaces";

export const AccessUser = ({ user_email, password }: IUserTypes) =>
  POST(ApiUrlsAuth.auth_acces_user, { user_email, password });

export const AccesOAuthUser = ({
  user_email,
  user_name,
  user_lastname,
  img_url,
  provider,
}: IFullIUserTypes) =>
  POST(ApiUrlsAuth.auth_oauth_user, {
    user_email,
    user_name,
    user_lastname,
    img_url,
    provider,
  });
