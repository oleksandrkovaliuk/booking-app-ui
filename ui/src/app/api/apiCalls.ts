import { GET, POST } from "./config";

export const AccessUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => POST("auth/accessUser", { email, password });
