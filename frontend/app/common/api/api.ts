import Cookies, { parseCookies } from "nookies";
import axios from "axios";
import { GetServerSidePropsContext, NextPageContext } from "next";
import { UserApi } from "./user";
import { PostApi } from "./post";

export type ApiType = {
  user: ReturnType<typeof UserApi>;
  post: ReturnType<typeof PostApi>;
};

export const Api = (
  context?: NextPageContext | GetServerSidePropsContext
): ApiType => {
  const cookies = context ? Cookies.get(context) : parseCookies();
  const access_token = cookies.access_token;

  const instance = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
    ...(access_token && {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }),
  });

  return {
    user: UserApi(instance),
    post: PostApi(instance),
  };
};
