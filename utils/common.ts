import { BigNumber, ContractInterface, Contract, providers } from "ethers";
import ktonAbi from "../abi/kton.json";
import migratorAbi from "../abi/migrator.json";

export const toShortAddress = (address: string) => {
  if (address.length > 12) {
    return `${address.slice(0, 6)} ... ${address.slice(-4)}`;
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

export const approveKton = async (
  provider?: providers.Web3Provider | null,
  contractAddress?: string | null,
  spender?: string | null
) => {
  if (provider && contractAddress && spender) {
    const contract = new Contract(contractAddress, ktonAbi, provider.getSigner());
    await contract.approve(spender, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
  }
};

export const migrateKton = async (provider?: providers.Web3Provider | null, contractAddress?: string | null) => {
  if (provider && contractAddress) {
    const contract = new Contract(contractAddress, migratorAbi, provider.getSigner());
    await contract.migrate();
  }
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
