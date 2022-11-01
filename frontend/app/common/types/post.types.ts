import { User } from "./user.types";

export type Post = {
  id: number;
  title: string;
  text: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
};

export type CreatePost = {
  title: string;
  text: string;
};
