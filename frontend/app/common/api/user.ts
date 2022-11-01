import { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { SigninValues, User } from "../types/user.types";

export const UserApi = (instance: AxiosInstance) => ({
  async signin(values: SigninValues): Promise<any> {
    const { data } = await instance.post("auth/signin", values);

    return data;
  },
  async getMe(): Promise<User[]> {
    const { data } = await instance.get<User[]>("/user/me");

    return data;
  },
  async logout(): Promise<any> {
    const { data } = await instance.get("auth/logout");

    return data;
  },
});
