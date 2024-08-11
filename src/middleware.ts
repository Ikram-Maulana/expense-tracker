import { env } from "@/env";
import { auth } from "@/lib/auth";
import { createRouteMatcher } from "@/lib/route-matcher";
import {
  apiRoutes,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "@/routes";
import arcjet, { detectBot, shield } from "@arcjet/next";
import { NextResponse, type NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher(publicRoutes);
const isAuthRoute = createRouteMatcher(authRoutes);
const isAPIRoute = createRouteMatcher(apiRoutes);

const aj = arcjet({
  key: env.ARCJET_KEY,
  rules: [
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE",
      block: ["AUTOMATED"],
      patterns: {
        remove: [
          // Vercel screenshot agent
          "vercel-screenshot/1.0",
          // Allow generally friendly bots like GoogleBot and DiscordBot. These
          // have a more complex user agent like "AdsBot-Google
          // (+https://www.google.com/adsbot.html)" or "Mozilla/5.0 (compatible;
          // Discordbot/2.0; +https://discordapp.com)" so need multiple patterns
          "^[a-z.0-9/ \\-_]*bot",
          "bot($|[/\\);-]+)",
          "http[s]?://",
          // Chrome Lighthouse
          "Chrome-Lighthouse",
        ],
      },
    }),
  ],
});

export const middleware = async (req: NextRequest) => {
  // Protect from bots and other threats
  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    const { reason } = decision;

    if (reason.isBot()) {
      const { botType } = reason;

      if (botType === "VERIFIED_BOT" || botType === "LIKELY_NOT_A_BOT") {
        return NextResponse.next();
      }
    }

    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Custom logic for public, auth, and api routes
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
