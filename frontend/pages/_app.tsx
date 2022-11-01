import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MainProvider } from "../app/providers/MainProvider";
import { Layout } from "../app/components/layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MainProvider pageProps={pageProps}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MainProvider>
  );
};

export default App;
