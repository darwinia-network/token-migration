import React from "react";
import { PageLayout } from "../components/PageLayout";
import { MigratorCard } from "../components/MigratorCard";
import { Instruction } from "../components/Instruction";

const Home: React.FC = () => {
  return (
    <PageLayout>
      <div className="grid grid-cols-2 gap-x-20">
        <MigratorCard />
        <Instruction />
      </div>
    </PageLayout>
  );
};

export default Home;
