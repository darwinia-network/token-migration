import TokenSelector from "./token-selector";

import { useApi } from "../hooks/api";
import { useState } from "react";

const MigrationSelector = () => {
  const { migration, balances, setAssetToMigrate } = useApi();
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
        onSelect={(index) => {
          setSelected(index);
          setAssetToMigrate(migration.migrations[index]);
        }}
        balance={balances?.classic}
      />
      <TokenSelector
        label="You receive (New token)"
        className="mt-5"
        isForNewToken
        defaultValue={migration.migrations.map((item) => item.to)[selected]}
        balance={balances?.current}
        tokens={[]}
      />
    </>
  );
};

export default MigrationSelector;
