import { utils } from "ethers";
import { ChainID, ChainConfig, ChainName } from "../types";

export const CHAINS_CONF: Record<ChainID, ChainConfig> = {
  [ChainID.CrabSmartChain]: {
    chainId: utils.hexlify(ChainID.CrabSmartChain),
    chainName: ChainName.CrabSmartChain,
    rpcUrls: ["https://crab-rpc.darwinia.network"],
    blockExplorerUrls: ["https://crab.subscan.io"],

    logoSrc: "/images/crab-smart-chain.svg",
    disable: false,
  },
  // [ChainID.PangolinSmartChain]: {
  //   chainId: utils.hexlify(ChainID.PangolinSmartChain),
  //   chainName: ChainName.PangolinSmartChain,
  //   rpcUrls: ["https://pangolin-rpc.darwinia.network"],
  //   blockExplorerUrls: ["https://pangolin.subscan.io"],

  //   logoSrc: "/images/pangolin-smart-chain.svg",
  //   isTextNet: true,
  // },
};
