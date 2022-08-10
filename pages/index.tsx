import type { NextPage } from "next";
import Head from "next/head";

import Layout from "../components/layout";
import Migrate from "../components/migrate";
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
        <div className="grid grid-cols-2 gap-x-20">
          <Migrate />
          <Instructions />
        </div>
      </Layout>
    </>
  );
};

export default Home;
