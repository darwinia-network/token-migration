import React, { createContext, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { BigNumber, providers } from "ethers";
import { Subscription, EMPTY, forkJoin, from } from "rxjs";

import { getTokenBalance } from "../utils";
import { ChainID, Asset } from "../types";
import { MIGRATORS_CONF, TOKENS_CONF } from "../config";

interface ApiCtx {
  accounts: string[] | null;
  provider: providers.Web3Provider | null;
  currentChain: number | null;
  migratorIndex: number | null;
  assets: { legacy: Asset | null; current: Asset | null } | null;

  refreshBalance: () => void;
  requestAccounts: () => void;
  setMigratorIndex: (index: number) => void;
}

export const ApiContext = createContext<ApiCtx>({} as ApiCtx);

export const ApiProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [accounts, setAccounts] = useState<string[] | null>(null);
  const [provider, setProvider] = useState<providers.Web3Provider | null>(null);
  const [currentChain, setCurrentChain] = useState<number | null>(null);
  const [migratorIndex, setMigratorIndex] = useState<number | null>(null);
  const [assets, setAssets] = useState<{ legacy: Asset | null; current: Asset | null } | null>(null);

  const getBalance = useCallback(() => {
    if (provider && migratorIndex !== null && MIGRATORS_CONF[currentChain as ChainID] && accounts?.length) {
      const oldToken = TOKENS_CONF[MIGRATORS_CONF[currentChain as ChainID][migratorIndex].from];
      const newToken = TOKENS_CONF[MIGRATORS_CONF[currentChain as ChainID][migratorIndex].to];

      return forkJoin([
        oldToken.options.address
          ? getTokenBalance(provider, oldToken.options.address, accounts[0])
          : Promise.resolve(BigNumber.from(-1)),
        newToken.options.address
          ? getTokenBalance(provider, newToken.options.address, accounts[0])
          : Promise.resolve(BigNumber.from(-1)),
      ]).subscribe(([amountOld, amountNew]) => {
        setAssets({
          legacy: { decimals: oldToken.options.decimals, balance: amountOld.isNegative() ? null : amountOld },
          current: { decimals: newToken.options.decimals, balance: amountNew.isNegative() ? null : amountNew },
        });
      });
    } else {
      setAssets(null);
      return EMPTY.subscribe();
    }
  }, [provider, accounts, currentChain, migratorIndex]);

  const requestAccounts = useCallback(async () => {
    if (provider) {
      setAccounts(await provider.send("eth_requestAccounts", []));
    } else {
      setAccounts(null);
    }
  }, [provider]);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setProvider(new providers.Web3Provider(window.ethereum));

      window.ethereum.on("chainChanged", () => {
        setProvider(new providers.Web3Provider(window.ethereum));
      });

      window.ethereum.on("accountsChanged", (accs: string[]) => {
        setAccounts(accs);
      });
    } else {
      setProvider(null);
    }
  }, []);

  useEffect(() => {
    let sub$$: Subscription;

    if (provider) {
      sub$$ = from(provider.getNetwork()).subscribe(({ chainId }) => {
        setCurrentChain(chainId);

        if (MIGRATORS_CONF[chainId as ChainID]) {
          setMigratorIndex(0);
        } else {
          setMigratorIndex(null);
        }
      });
    } else {
      setCurrentChain(null);
    }

    return () => {
      if (sub$$) {
        sub$$.unsubscribe();
      }
    };
  }, [provider]);

  useEffect(() => {
    const sub$$ = getBalance();
    return () => sub$$.unsubscribe();
  }, [getBalance]);

  return (
    <ApiContext.Provider
      value={{
        accounts,
        provider,
        assets,
        currentChain,
        migratorIndex,
        requestAccounts,
        setMigratorIndex,
        refreshBalance: getBalance,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
