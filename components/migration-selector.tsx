import TokenSelector from "./token-selector";

import { useApi } from "../hooks/api";

const MigrationSelector = () => {
  const { migration } = useApi();

  if (!migration) {
    return null;
  }

  return (
    <>
      <TokenSelector label="Amount to migrate (Old token)" tokens={migration?.migrations.map((item) => item.from)} />
      <TokenSelector
        label="You receive (New token)"
        className="mt-5"
        isForNewToken
        tokens={migration?.migrations.map((item) => item.to)}
      />
    </>
  );
};

export default MigrationSelector;
