import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";
import { NextRequest, NextResponse } from "next/server";
import { parseCookies } from "nookies";
import { protectedRoutesHandler } from "./protectedRoutes";
import { protectedRoutesConfig } from "./protectedRoutes/protectedRoutes.config";

export default function middleware(req: NextRequest) {
  const { cookies, url } = req;

  const access_token = cookies.get("access_token");
  const isAuthorized = !!access_token;

  return protectedRoutesHandler(isAuthorized, url);
}
