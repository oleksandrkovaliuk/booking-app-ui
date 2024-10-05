import { NextResponse } from "next/server";
import { Roles } from "./_utilities/enums";
import { getToken } from "next-auth/jwt";

export async function middleware(req: any) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const adminRoutes = ["control/", "control/:path*"];
  if (adminRoutes.some((routes) => pathname.startsWith(routes))) {
    if (token.role !== Roles.ADMIN) {
      return NextResponse.redirect(new URL("/accesDenied", req.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/create", "/create/:path*", "/manage", "/manage/:path*"],
};
