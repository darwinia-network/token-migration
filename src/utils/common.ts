import { BigNumber, ContractInterface, Contract, providers } from "ethers";
import { triggerContract } from "../utils";
import ktonAbi from "../abi/kton.json";
import migratorAbi from "../abi/migrator.json";

export const toShortAddress = (address: string) => {
  if (address.length > 12) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  return address;
};

const getErc20Balance = async (
  provider?: providers.Web3Provider | null,
  contractAddress?: string | null,
  contractInterface?: ContractInterface | null,
  account?: string | null
) => {
  if (provider && contractAddress && contractInterface && account) {
    const contract = new Contract(contractAddress, contractInterface, provider);

    return (await contract.balanceOf(account)) as Promise<BigNumber>;
  }

  return BigNumber.from(0);
};

export const getKtonBalance = async (
  provider?: providers.Web3Provider | null,
  contractAddress?: string | null,
  account?: string | null
) => {
  return await getErc20Balance(provider, contractAddress, ktonAbi, account);
};

export const allowanceKton = async (
  provider?: providers.Web3Provider | null,
  contractAddress?: string | null,
  owner?: string | null,
  spender?: string | null
) => {
  if (provider && contractAddress && owner && spender) {
    const contract = new Contract(contractAddress, ktonAbi, provider);

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

export const approveKton = async (
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
    const contract = new Contract(contractAddress, ktonAbi, provider.getSigner());

    await triggerContract(
      contract,
      "approve",
      [spender, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"],
      txCallback({ ...callback })
    );
    // await contract.approve(spender, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
  }
};

export const migrateKton = async (
  provider?: providers.Web3Provider | null,
  contractAddress?: string | null,
  callback?: {
    onError?: (error: Error) => void;
    onSuccess?: (txHash: string) => void;
    onResponse?: (txHash: string) => void;
  }
) => {
  if (provider && contractAddress) {
    const contract = new Contract(contractAddress, migratorAbi, provider.getSigner());

    await triggerContract(contract, "migrate", [], txCallback({ ...callback }));
    // await contract.migrate();
  }
};
