import type { AddEthereumChainParameter } from "./metamask";

export enum ChainName {
  CrabSmartChain = "Crab Smart Chain",
  PangolinSmartChain = "Pangolin Smart Chain",
}

export enum ChainID {
  CrabSmartChain = 44,
  PangolinSmartChain = 43,
}

export interface ChainConfig extends AddEthereumChainParameter {
  logoSrc: string;
  isTextNet?: boolean;
  disable?: boolean;
  hidden?: boolean;
}
