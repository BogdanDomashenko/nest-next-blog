import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";
import { NextRequest, NextResponse } from "next/server";
import { protectedRoutesConfig } from "./protectedRoutes.config";
import { ProtectedRoutesConfig } from "./protectedRoutes.types";

export const protectedRoutesHandler = (isAuthorized: boolean, url: string) => {
  const { pathname } = parseUrl(url);

  for (let route of protectedRoutesConfig) {
    if (pathname === route.path) {
      const redirect =
        (route.authorizedRequired && !isAuthorized) ||
        (route.notAuthorizedRequired && isAuthorized);

      if (redirect) {
        return NextResponse.redirect(new URL(route.redirect, url));
      }
    }
  }
};
