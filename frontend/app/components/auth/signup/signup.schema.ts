import { object, string } from "yup";

export const signupSchema = object({
  email: string().email("Should be email").required("Required"),
  username: string().min(4).required("Required"),
  password: string().min(8).required("Required"),
});
