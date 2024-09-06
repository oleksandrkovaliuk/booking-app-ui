import { POST } from "../apiConfig";
import { ApiUrls } from "@/store/api/lib/constants";
import { FullUserTypes, UserTypes } from "@/_utilities/interfaces";

export const AccessUser = ({ email, password }: UserTypes) =>
  POST(ApiUrls.auth_acces_user, { email, password });

export const AccesOAuthUser = ({
  email,
  user_name,
  user_lastname,
  img_url,
  provider,
}: FullUserTypes) =>
  POST(ApiUrls.auth_oauth_user, {
    email,
    user_name,
    user_lastname,
    img_url,
    provider,
  });
