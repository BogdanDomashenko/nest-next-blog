import { ProtectedRoutesConfig } from "./protectedRoutes.types";

const redirectOnNotAuthorized = "/auth/signin";
const redirectOnAuthorized = "/";

export const protectedRoutesConfig: ProtectedRoutesConfig = [
  { path: "/", authorizedRequired: true, redirect: redirectOnNotAuthorized },
  {
    path: "/auth/signin",
    notAuthorizedRequired: true,
    redirect: redirectOnAuthorized,
  },
  {
    path: "/auth/signup",
    notAuthorizedRequired: true,
    redirect: redirectOnAuthorized,
  },
];
