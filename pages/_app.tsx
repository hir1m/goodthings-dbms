import { AppProps } from "next/dist/next-server/lib/router/router";
import "../styles/globals.scss";
import Layout from "../components/layout";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
