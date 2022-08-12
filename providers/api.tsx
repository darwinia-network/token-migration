import { createContext, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { BigNumber, Contract, providers } from "ethers";
import { EMPTY, forkJoin } from "rxjs";

import type { ConfigData, AssetToMigrate, Balances } from "../types";
import { config } from "../config";
import ktonAbi from "../abi/ktonABI.json";

export interface ApiCtx {
  accounts: string[] | null;
  provider: providers.Web3Provider | null;
  migration: ConfigData | null;
  assetToMigrate: AssetToMigrate | null;
  balances: Balances | null;

  setAccounts: (_: string[]) => void;
  setMigration: (_: ConfigData) => void;
  setAssetToMigrate: (_: AssetToMigrate | null) => void;
  refreshBalances: () => void;
}

export const ApiContext = createContext<ApiCtx>({} as ApiCtx);

export const ApiProvider = ({ children }: PropsWithChildren<{}>) => {
  const [accounts, setAccounts] = useState<string[] | null>(null);
  const [provider, setProvider] = useState<providers.Web3Provider | null>(null);
  const [migration, setMigration] = useState<ConfigData | null>(null);
  const [assetToMigrate, setAssetToMigrate] = useState<AssetToMigrate | null>(null);
  const [balances, setBalances] = useState<Balances | null>(null);

  const getKtonBalance = useCallback(
    async (contractAddress?: string | null, account?: string | null) => {
      if (contractAddress && account && provider) {
        const contract = new Contract(contractAddress, ktonAbi, provider);
        return (await contract.balanceOf(account)) as Promise<BigNumber>;
      } else {
        return BigNumber.from(0);
      }
    },
    [provider]
  );

  const getBalances = useCallback(() => {
    if (assetToMigrate && accounts?.length) {
      return forkJoin([
        getKtonBalance(assetToMigrate.from.options.address, accounts[0]),
        getKtonBalance(assetToMigrate.to.options.address, accounts[0]),
      ]).subscribe(([classic, current]) => {
        setBalances({ classic, current });
      });
    } else {
      setBalances(null);
      return EMPTY.subscribe();
    }
  }, [assetToMigrate, accounts, getKtonBalance]);

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

  useEffect(() => {
    if (accounts && provider) {
      provider.getNetwork().then((network) => {
        const match = config.find(({ chainParam: { chainId } }) => Number(chainId) === network.chainId);

        if (match) {
          setMigration(match);
        } else {
          setMigration(null);
        }
      });
    }
  }, [accounts, provider]);

  useEffect(() => {
    const sub$$ = getBalances();
    return () => sub$$.unsubscribe();
  }, [getBalances]);

  return (
    <ApiContext.Provider
      value={{
        accounts,
        provider,
        migration,
        assetToMigrate,
        balances,
        setAccounts,
        setMigration,
        setAssetToMigrate,
        refreshBalances: getBalances,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
