import { object, string } from "yup";

export const signinSchema = object({
  username: string().required("Required"),
  password: string().required("Required"),
});
