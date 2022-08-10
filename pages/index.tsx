import type { NextPage } from "next";
import Head from "next/head";

import Layout from "../components/layout";
import Instructions from "../components/instructions";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Token Migration | Darwinia</title>
        <meta name="description" content="Darwinia Token Migration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex items-start justify-center space-x-20">
          <div className="flex-1 border border-[#FF0083] h-[594px]"></div>
          <Instructions classname="flex-1" />
        </div>
      </Layout>
    </>
  );
};

export default Home;
