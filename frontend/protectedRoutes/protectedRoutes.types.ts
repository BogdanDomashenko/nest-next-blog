export type ProtectedRoutesConfig = {
  path: string;
  authorizedRequired?: boolean;
  notAuthorizedRequired?: boolean;
  redirect: string;
}[];
