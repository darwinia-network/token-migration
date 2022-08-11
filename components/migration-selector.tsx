import TokenSelector from "./token-selector";

import { useApi } from "../hooks/api";
import { useState } from "react";

const MigrationSelector = () => {
  const { migration } = useApi();
  const [selected, setSelected] = useState(
    migration?.migrations.map((item) => item.from).findIndex((item) => !item.disable) || 0
  );

  if (!migration) {
    return null;
  }

  return (
    <>
      <TokenSelector
        label="Amount to migrate (Old token)"
        tokens={migration.migrations.map((item) => item.from)}
        onSelect={(index) => setSelected(index)}
      />
      <TokenSelector
        label="You receive (New token)"
        className="mt-5"
        isForNewToken
        defaultValue={migration.migrations.map((item) => item.to)[selected]}
        tokens={[]}
      />
    </>
  );
};

export default MigrationSelector;
