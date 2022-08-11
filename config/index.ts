import { ConfigData, ChainName, TokenSymbol } from "../types";

export const config = [
  {
    logoSrc: "/images/crab-smart-chain.svg",
    chainParam: {
      chainId: "0x2c", // 44
      chainName: ChainName.CrabSmartChain,
      rpcUrls: ["https://crab-rpc.darwinia.network/"],
      blockExplorerUrls: ["https://crab.subscan.io/"],
    },
    migrations: [
      {
        from: {
          name: TokenSymbol.XRingClassic,
          symbol: TokenSymbol.XRingClassic,
          decimals: 18,
          iconSrc: "/images/x-wring.svg",
          disable: true,
        },
        to: {
          name: TokenSymbol.XWRing,
          symbol: TokenSymbol.XWRing,
          decimals: 18,
          iconSrc: "/images/x-wring.svg",
          contractAddress: "",
          disable: true,
        },
      },
      {
        from: {
          name: TokenSymbol.WCKtonClassic,
          symbol: TokenSymbol.WCKtonClassic,
          decimals: 18,
          iconSrc: "/images/ckton.svg",
          contractAddress: "",
        },
        to: {
          name: TokenSymbol.CKton,
          symbol: TokenSymbol.CKton,
          decimals: 18,
          iconSrc: "/images/ckton.svg",
          contractAddress: "",
        },
      },
    ],
  },
  {
    logoSrc: "/images/pangolin-smart-chain.svg",
    chainParam: {
      chainId: "0x2b", // 43
      chainName: ChainName.PangolinSmartChain,
      rpcUrls: ["https://pangolin-rpc.darwinia.network/"],
      blockExplorerUrls: ["https://pangolin.subscan.io/"],
    },
    migrations: [
      {
        from: {
          name: TokenSymbol.XORingClassic,
          symbol: TokenSymbol.XORingClassic,
          decimals: 18,
          iconSrc: "/images/x-woring.svg",
          disable: true,
        },
        to: {
          name: TokenSymbol.XWORing,
          symbol: TokenSymbol.XWORing,
          decimals: 18,
          iconSrc: "/images/x-woring.svg",
          contractAddress: "",
        },
      },
      {
        from: {
          name: TokenSymbol.WPKtonClassic,
          symbol: TokenSymbol.WPKtonClassic,
          decimals: 18,
          iconSrc: "/images/pkton.svg",
        },
        to: {
          name: TokenSymbol.PKton,
          symbol: TokenSymbol.PKton,
          decimals: 18,
          iconSrc: "/images/pkton.svg",
          contractAddress: "",
        },
      },
    ],
    isTextNet: true,
  },
] as ConfigData[];
