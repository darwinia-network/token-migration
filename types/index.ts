import { providers } from "ethers";

export enum ChainName {
  CrabSmartChain = "Crab Smart Chain",
  PangolinSmartChain = "Pangolin Smart Chain",
}

export enum TokenSymbol {
  XWRing = "xWRING",
  XWORing = "xWORING",
  CKton = "CKTON",
  PKton = "PKTON",
  XRingClassic = "xRING(Classic)",
  XORingClassic = "xORING(Classic)",
  WCKtonClassic = "WCKTON(Classic)",
  WPKtonClassic = "WPKTON(Classic)",
}

interface WatchAssetParams {
  type: "ERC20"; // In the future, other standards will be supported
  options: {
    address: string; // The address of the token contract
    symbol: string; // A ticker symbol or shorthand, up to 11 characters
    decimals: number; // The number of token decimals
    image: string; // A string url of the token logo
  };
}

interface AddEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency?: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

export interface TokenInfo extends WatchAssetParams {
  iconSrc: string;
  disable?: boolean;
}

export interface ConfigData {
  logoSrc: string;
  chainParam: AddEthereumChainParameter;
  migrations: {
    from: TokenInfo;
    to: TokenInfo;
  }[];
  migratorAddress: string;
  isTextNet?: boolean;
}

export interface ApiCtx {
  accounts: string[] | null;
  provider: providers.Web3Provider | null;
  migration: ConfigData | null;

  setAccounts: (acs: string[]) => void;
  setMigration: (cfg: ConfigData) => void;
}
