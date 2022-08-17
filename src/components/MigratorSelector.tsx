import React from "react";
import { BigNumber } from "ethers";

import { TokenSelector } from "./TokenSelector";
import { useApi } from "../hooks";
import { MIGRATORS_CONF, TOKENS_CONF } from "../config";
import { ChainID } from "../types";

export const MigratorSelector = ({ refreshTrigger }: { refreshTrigger?: boolean }) => {
  const { balance, currentChain, migratorIndex, setMigratorIndex } = useApi();

  if (migratorIndex === null || currentChain === null) {
    return null;
  }

  return (
    <>
      <TokenSelector
        label="Amount to migrate (Old token)"
        value={migratorIndex}
        balance={balance?.oldToken}
        options={MIGRATORS_CONF[currentChain as ChainID]
          .map((item) => ({ symbol: item.from, disable: item.disable }))
          .map(({ symbol, disable }) => ({ ...TOKENS_CONF[symbol], disable }))}
        refreshTrigger={refreshTrigger}
        onSelect={setMigratorIndex}
      />
      <TokenSelector
        label="You receive (New token)"
        value={migratorIndex}
        balance={balance?.newToken}
        receive={balance?.oldToken || BigNumber.from(0)}
        options={MIGRATORS_CONF[currentChain as ChainID]
          .map((item) => ({ symbol: item.to, disable: item.disable }))
          .map(({ symbol, disable }) => ({ ...TOKENS_CONF[symbol], disable }))}
        className="mt-5"
      />
    </>
  );
};
