import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import { FC, ReactNode, useEffect, useState } from "react";
import { useUser } from "../../common/hooks";
import { Navigation } from "./navigation";

type Props = {
  children?: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const newIsAuthorized = !!parseCookies().access_token;

    if (isAuthorized !== newIsAuthorized) {
      setIsAuthorized(newIsAuthorized);
    }
  }, [children]);

  return (
    <>
      <Navigation isAuthorized={isAuthorized} />
      {children}
    </>
  );
};
