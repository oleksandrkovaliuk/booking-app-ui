import { GET, POST } from "./config";

export const checkGet = async () => GET("check/working");
export const checkPost = async ({ code }: { code: string }) =>
  POST("check/working", { code });
