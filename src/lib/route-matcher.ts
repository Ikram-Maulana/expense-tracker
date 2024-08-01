import { paths } from "@/lib/paths";
import { type NextRequest } from "next/server";

type Route = string | RegExp;
type Routes = Route | Route[];

const createRouteMatcher = (
  routes: Routes | ((req: NextRequest) => boolean),
) => {
  if (typeof routes === "function") {
    return (req: NextRequest) => routes(req);
  }
  const routePatterns: Route[] = [routes || ""].flat().filter(Boolean);
  const matchers = precomputePathRegex(routePatterns);
  return (req: NextRequest) =>
    matchers.some((matcher) => matcher.test(req.nextUrl.pathname));
};

const precomputePathRegex = (patterns: Route[]): RegExp[] => {
  return patterns.map((pattern) =>
    pattern instanceof RegExp ? pattern : paths.toRegexp(pattern),
  );
};

export { createRouteMatcher };
