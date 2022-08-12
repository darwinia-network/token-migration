import { createContext, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { BigNumber, providers } from "ethers";
import { Subscription, EMPTY, forkJoin, from } from "rxjs";

import { getKtonBalance } from "../utils/common";
import { ChainID } from "../types";
import { MIGRATORS_CONF, TOKENS_CONF } from "../config";

export interface ApiCtx {
  accounts: string[] | null;
  provider: providers.Web3Provider | null;
  currentChain: number | null;
  migratorIndex: number | null;
  balance: { oldToken: BigNumber | null; newToken: BigNumber | null } | null;

  refreshBalance: () => void;
  requestAccounts: () => void;
  setMigratorIndex: (index: number) => void;
}

export const ApiContext = createContext<ApiCtx>({} as ApiCtx);

export const ApiProvider = ({ children }: PropsWithChildren<{}>) => {
  const [accounts, setAccounts] = useState<string[] | null>(null);
  const [provider, setProvider] = useState<providers.Web3Provider | null>(null);
  const [currentChain, setCurrentChain] = useState<number | null>(null);
  const [migratorIndex, setMigratorIndex] = useState<number | null>(null);
  const [balance, setBalance] = useState<{ oldToken: BigNumber | null; newToken: BigNumber | null } | null>(null);

  const getBalance = useCallback(() => {
    if (provider && migratorIndex !== null && MIGRATORS_CONF[currentChain as ChainID] && accounts?.length) {
      const tokenOld = TOKENS_CONF[MIGRATORS_CONF[currentChain as ChainID][migratorIndex].from];
      const tokenNew = TOKENS_CONF[MIGRATORS_CONF[currentChain as ChainID][migratorIndex].to];

      return forkJoin([
        tokenOld.isRing
          ? Promise.resolve(BigNumber.from(-1))
          : // ? provider.getBalance(accounts[0]) // TODO
          tokenOld.options.address
          ? getKtonBalance(provider, tokenOld.options.address, accounts[0])
          : Promise.resolve(BigNumber.from(-1)),
        tokenNew.isRing
          ? Promise.resolve(BigNumber.from(-1))
          : // ? provider.getBalance(accounts[0]) // TODO
          tokenNew.options.address
          ? getKtonBalance(provider, tokenNew.options.address, accounts[0])
          : Promise.resolve(BigNumber.from(-1)),
      ]).subscribe(([amountOld, amountNew]) => {
        setBalance({
          oldToken: amountOld.isNegative() ? null : amountOld,
          newToken: amountNew.isNegative() ? null : amountNew,
        });
      });
    } else {
      setBalance(null);
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
        balance,
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
