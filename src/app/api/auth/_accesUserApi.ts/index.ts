import { POST } from "../apiConfig";
import { ApiUrlsAuth } from "@/store/api/lib/constants";
import { IFullIUserTypes, IUserTypes } from "@/_utilities/interfaces";

export const AccessUser = ({ email, password }: IUserTypes) =>
  POST(ApiUrlsAuth.auth_acces_user, { email, password });

export const AccesOAuthUser = ({
  email,
  user_name,
  user_lastname,
  img_url,
  provider,
}: IFullIUserTypes) =>
  POST(ApiUrlsAuth.auth_oauth_user, {
    email,
    user_name,
    user_lastname,
    img_url,
    provider,
  });
