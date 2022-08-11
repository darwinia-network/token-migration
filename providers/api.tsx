import { createContext, PropsWithChildren, useState } from "react";
import { providers } from "ethers";
import type { ApiCtx } from "../types";

export const ApiContext = createContext<ApiCtx>({} as ApiCtx);

export const ApiProvider = ({ children }: PropsWithChildren<{}>) => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [provider, setProvider] = useState<providers.Web3Provider>();

  return <ApiContext.Provider value={{ accounts, provider, setAccounts, setProvider }}>{children}</ApiContext.Provider>;
};
