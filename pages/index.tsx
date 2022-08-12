import type { NextPage } from "next";
import Head from "next/head";

import { PageLayout } from "../components/PageLayout";
import { MigratorCard } from "../components/MigratorCard";
import { Instruction } from "../components/Instruction";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Token Migration | Darwinia</title>
        <meta name="description" content="Darwinia Token Migration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <div className="grid grid-cols-2 gap-x-20">
          <MigratorCard />
          <Instruction />
        </div>
      </PageLayout>
    </>
  );
};

export default Home;
