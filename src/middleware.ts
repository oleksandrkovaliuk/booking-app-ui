export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/create", "/create/:path*", "/manage", "/manage/:path*"],
};
