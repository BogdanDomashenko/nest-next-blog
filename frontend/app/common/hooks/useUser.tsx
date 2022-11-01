import { QueryObserverOptions, useQuery } from "@tanstack/react-query";
import { Api } from "../api";

export const useUser = (options: QueryObserverOptions = {}) => {
  const query = useQuery(["user"], Api().user.getMe, options as any);

  return query;
};
