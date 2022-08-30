import { useCallback, useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { from } from "rxjs";

import { useApi } from "./api";
import { getTokenBalance } from "../utils";

export const usetTokenBalance = (contractAddress?: string | null, account?: string | null) => {
  const { provider } = useApi();
  const [balance, setBalance] = useState(BigNumber.from(0));

  const getBalance = useCallback(
    () => from(getTokenBalance(provider, contractAddress, account)).subscribe(setBalance),
    [contractAddress, account, provider]
  );

  useEffect(() => {
    const sub$$ = getBalance();

    return () => sub$$.unsubscribe();
  }, [getBalance]);

  return { balance, refresh: getBalance };
};
