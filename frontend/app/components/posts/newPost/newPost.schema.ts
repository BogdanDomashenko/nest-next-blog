import { object, string } from "yup";

export const newPostSchema = object({
  title: string().required("Required"),
  text: string().required("Required"),
});
