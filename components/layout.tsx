import Head from "next/head";
import Navigation from "./navigation";

const Layout: React.FC = ({ children: children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Good Things Employee Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
