import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextResponse } from "next/server";

import { AUTH_ROUTE } from "@/configs/routes";

export default async function middleware(
  req: NextRequestWithAuth,
  event: NextFetchEvent
) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (
    AUTH_ROUTE.some((item) => req.nextUrl.pathname.startsWith(item)) &&
    isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const authMiddleware = withAuth({
    callbacks: {
      authorized: ({ token }) => {
        if (token) return true;
        return false;
      },
    },
    pages: {
      signIn: `/sign-in`,
    },
  });

  return authMiddleware(req, event);
}

export const config = {
  // set matcher for images, assets and public files
  // matcher: ["/((?!.*\\.).*)", "/favicon.ico"],

  matcher: ["/dashboard/:path*", "/sign-in"],
};
