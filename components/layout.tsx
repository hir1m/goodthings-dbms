import Head from "next/head";

const Layout: React.FC = ({ children: children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Good Things Employee Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
};

export default Layout;
