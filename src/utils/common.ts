import { BigNumber, BigNumberish, FixedNumber, ContractInterface, Contract, providers } from "ethers";
import { triggerContract } from "../utils";
import tokenAbi from "../abi/token.json";
import migratorAbi from "../abi/migrator.json";

export const toShortAddress = (address: string) => {
  if (address.length > 12) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  return address;
};

export const formatBalance = (value: BigNumber, unitName?: BigNumberish, decimals = 9): string =>
  FixedNumber.fromValue(value, unitName).round(decimals).toString();

const getErc20Balance = async (
  provider?: providers.Web3Provider | null,
  contractAddress?: string | null,
  contractInterface?: ContractInterface | null,
  account?: string | null
) => {
  try {
    if (provider && contractAddress && contractInterface && account) {
      const contract = new Contract(contractAddress, contractInterface, provider);

      return (await contract.balanceOf(account)) as Promise<BigNumber>;
    }
  } catch (err) {
    console.error(err);
  }

  return BigNumber.from(0);
};

export const getTokenBalance = async (
  provider?: providers.Web3Provider | null,
  contractAddress?: string | null,
  account?: string | null
) => {
  return await getErc20Balance(provider, contractAddress, tokenAbi, account);
};

export const allowanceToken = async (
  provider?: providers.Web3Provider | null,
  contractAddress?: string | null,
  owner?: string | null,
  spender?: string | null
) => {
  if (provider && contractAddress && owner && spender) {
    const contract = new Contract(contractAddress, tokenAbi, provider);

    return (await contract.allowance(owner, spender)) as Promise<BigNumber>;
  } else {
    return BigNumber.from(0);
  }
};

const txCallback = ({
  onError = () => undefined,
  onSuccess = () => undefined,
  onResponse = () => undefined,
}: {
  onError?: (error: Error) => void;
  onSuccess?: (txHash: string) => void;
  onResponse?: (txHash: string) => void;
}) => {
  return {
    errorCallback: ({ error }: { error: unknown }) => {
      console.error("transaction error:", error);
      onError(error as Error);
    },
    responseCallback: ({ response }: { response: providers.TransactionResponse }) => {
      console.log("transaction response:", response.hash);
      onResponse(response.hash);
    },
    successCallback: ({ receipt }: { receipt: providers.TransactionReceipt }) => {
      console.log("transaction receipt:", receipt.transactionHash);
      onSuccess(receipt.transactionHash);
    },
  };
};

export const approveToken = async (
  provider?: providers.Web3Provider | null,
  contractAddress?: string | null,
  spender?: string | null,
  callback?: {
    onError?: (error: Error) => void;
    onSuccess?: (txHash: string) => void;
    onResponse?: (txHash: string) => void;
  }
) => {
  if (provider && contractAddress && spender) {
    const contract = new Contract(contractAddress, tokenAbi, provider.getSigner());

    await triggerContract(
      contract,
      "approve",
      [spender, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"],
      txCallback({ ...callback })
    );
    // await contract.approve(spender, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
  }
};

export const migrateToken = async (
  provider?: providers.Web3Provider | null,
  contractAddress?: string | null,
  methodName?: "migrate" | "migrateAll",
  callback?: {
    onError?: (error: Error) => void;
    onSuccess?: (txHash: string) => void;
    onResponse?: (txHash: string) => void;
  }
) => {
  if (provider && contractAddress && methodName) {
    const contract = new Contract(contractAddress, migratorAbi, provider.getSigner());

    await triggerContract(contract, methodName, [], txCallback({ ...callback }));
    // await contract.migrate(); // kton
    // await contract.migrateAll(); // ring
  }
};
