import { FC, ReactNode } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { SeoProvider } from "./SeoProvider";
import { Layout } from "../components/layout";

type Props = {
  children: ReactNode;
  pageProps: any;
};

export const queryClient = new QueryClient();

export const MainProvider: FC<Props> = ({ children, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <Hydrate state={pageProps.dehydratedState}>
      <SeoProvider>{children}</SeoProvider>
    </Hydrate>
  </QueryClientProvider>
);
