import { NavigationItem } from "./navigation.types";

export const navigationItems: NavigationItem[] = [
  { name: "Home", redirect: "/" },
  { name: "Profile", redirect: "/profile", mustBeAuthorized: true },
];
