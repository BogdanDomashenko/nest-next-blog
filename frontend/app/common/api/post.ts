import { AxiosInstance } from "axios";
import { CreatePost, Post } from "../types/post.types";
import { SigninValues, User } from "../types/user.types";

export const PostApi = (instance: AxiosInstance) => ({
  async list(): Promise<any> {
    const { data } = await instance.get<Post[]>("post/list");

    return data;
  },

  async create(values: CreatePost): Promise<Post> {
    const { data } = await instance.post<Post>("post/create", values);

    return data;
  },
});
