import { NextPageContext } from "next";
import { Post } from "../types/post.types";
import { api } from "./api";
import { parseCookies } from "nookies";

export const getPosts = async (accessToken: string) => {
  const { data } = await api.get<Post[]>("/post/list", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
};
