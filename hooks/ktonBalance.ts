import { useEffect, useState } from "react";
import { BigNumber, Contract } from "ethers";
import { Subscription, from } from "rxjs";

import { useApi } from "./api";
import ktonAbi from "../abi/ktonABI.json";

export const useKtonBalance = (contractAddress?: string | null, account?: string | null) => {
  const { provider } = useApi();
  const [balance, setBalance] = useState(BigNumber.from(0));

  useEffect(() => {
    let sub$$: Subscription;

    if (contractAddress && account && provider) {
      const contract = new Contract(contractAddress, ktonAbi, provider);

      sub$$ = from(contract.balanceOf(account) as Promise<BigNumber>).subscribe(setBalance);
    }

    return () => {
      if (sub$$) {
        sub$$.unsubscribe();
      }
    };
  }, [contractAddress, account, provider]);

  return { balance };
};
