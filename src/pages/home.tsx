import React from "react";
import { PageLayout } from "../components/PageLayout";
import { MigratorCard } from "../components/MigratorCard";
import { Instruction } from "../components/Instruction";

const Home: React.FC = () => {
  return (
    <PageLayout>
      <div className="flex justify-between">
        <MigratorCard />
        <Instruction />
      </div>
    </PageLayout>
  );
};

export default Home;
