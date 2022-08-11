import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { providers } from "ethers";

import type { ApiCtx, ConfigData } from "../types";
import { config } from "../config";

export const ApiContext = createContext<ApiCtx>({} as ApiCtx);

export const ApiProvider = ({ children }: PropsWithChildren<{}>) => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [provider, setProvider] = useState<providers.Web3Provider | null>(null);
  const [migration, setMigration] = useState<ConfigData | null>(null);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setProvider(new providers.Web3Provider(window.ethereum));

      window.ethereum.on("chainChanged", (id: string) => {
        setProvider(new providers.Web3Provider(window.ethereum));

        const match = config.find(({ chainParam: { chainId } }) => chainId.toLowerCase() === id.toLowerCase());

        if (match) {
          setMigration(match);
        } else {
          setMigration(null);
        }
      });
    }
  }, []);

  return (
    <ApiContext.Provider value={{ accounts, provider, migration, setAccounts, setMigration }}>
      {children}
    </ApiContext.Provider>
  );
};
