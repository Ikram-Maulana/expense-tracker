import { auth } from "@/lib/auth";
import { createRouteMatcher } from "@/lib/route-matcher";
import {
  apiRoutes,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "@/routes";
import { NextResponse, type NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher(publicRoutes);
const isAuthRoute = createRouteMatcher(authRoutes);
const isAPIRoute = createRouteMatcher(apiRoutes);

export const middleware = async (req: NextRequest) => {
  if (isAPIRoute(req)) return NextResponse.next();

  const { nextUrl } = req;
  const session = await auth();
  const isAuth = isAuthRoute(req);
  const isPublic = isPublicRoute(req);

  if (isAuth && session?.user)
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  // The code below manipulates routes that are not public path and not contain the "default login redirect" path to be nexted and will be directed to not found page by Next.js
  if (!req.url.includes(DEFAULT_LOGIN_REDIRECT)) return NextResponse.next();
  if (!session?.user && !isPublic)
    return NextResponse.redirect(new URL("/auth/login", nextUrl));

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/api(.*)"],
};
