import { useCallback, useEffect, useState } from "react";
import { BigNumber, Contract } from "ethers";
import { EMPTY, from } from "rxjs";

import { useApi } from "./api";
import ktonAbi from "../abi/ktonABI.json";

export const useKtonBalance = (contractAddress?: string | null, account?: string | null) => {
  const { provider } = useApi();
  const [balance, setBalance] = useState(BigNumber.from(0));

  const getBalance = useCallback(() => {
    if (contractAddress && account && provider) {
      const contract = new Contract(contractAddress, ktonAbi, provider);

      return from(contract.balanceOf(account) as Promise<BigNumber>).subscribe(setBalance);
    } else {
      setBalance(BigNumber.from(0));

      return EMPTY.subscribe();
    }
  }, [contractAddress && account && provider]);

  useEffect(() => {
    const sub$$ = getBalance();

    return () => sub$$.unsubscribe();
  }, [getBalance]);

  return { balance, refresh: getBalance };
};
