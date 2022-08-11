import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { providers } from "ethers";

import type { ApiCtx } from "../types";
import { config } from "../config";

export const ApiContext = createContext<ApiCtx>({} as ApiCtx);

export const ApiProvider = ({ children }: PropsWithChildren<{}>) => {
  const [isSupported, setIsSupported] = useState(false);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [provider, setProvider] = useState<providers.Web3Provider>();

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setProvider(new providers.Web3Provider(window.ethereum));

      window.ethereum.on("chainChanged", (id: string) => {
        setProvider(new providers.Web3Provider(window.ethereum));

        if (config.some(({ chainParam: { chainId } }) => chainId.toLowerCase() === id.toLowerCase())) {
          setIsSupported(true);
        } else {
          setIsSupported(false);
        }
      });
    }
  }, []);

  return <ApiContext.Provider value={{ isSupported, accounts, provider, setAccounts }}>{children}</ApiContext.Provider>;
};
