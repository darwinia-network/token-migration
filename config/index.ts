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
    migratorAddress: "",
    migrations: [
      {
        from: {
          iconSrc: "/images/x-wring.svg",
          type: "ERC20",
          options: {
            address: "",
            symbol: TokenSymbol.XRingClassic,
            decimals: 18,
          },
          disable: true,
        },
        to: {
          iconSrc: "/images/x-wring.svg",
          type: "ERC20",
          options: {
            address: "",
            symbol: TokenSymbol.XWRing,
            decimals: 18,
          },
          disable: true,
        },
      },
      {
        from: {
          iconSrc: "/images/ckton.svg",
          type: "ERC20",
          options: {
            address: "0x8809f9b3ACEF1dA309f49b5Ab97A4C0faA64E6Ae",
            symbol: TokenSymbol.WCKtonClassic,
            decimals: 18,
          },
          disable: false,
        },
        to: {
          iconSrc: "/images/ckton.svg",
          type: "ERC20",
          options: {
            address: "0x0000000000000000000000000000000000000402",
            symbol: TokenSymbol.CKton,
            decimals: 18,
          },
          disable: false,
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
    migratorAddress: "0xE3F90f6Fe7c70b1F8cBEbc3477048d4F32E61f07",
    migrations: [
      {
        from: {
          iconSrc: "/images/x-woring.svg",
          type: "ERC20",
          options: {
            address: "",
            symbol: TokenSymbol.XORingClassic,
            decimals: 18,
          },
          disable: true,
        },
        to: {
          iconSrc: "/images/x-woring.svg",
          type: "ERC20",
          options: {
            address: "",
            symbol: TokenSymbol.XWORing,
            decimals: 18,
          },
          disable: true,
        },
      },
      {
        from: {
          iconSrc: "/images/pkton.svg",
          type: "ERC20",
          options: {
            address: "0x8809f9b3ACEF1dA309f49b5Ab97A4C0faA64E6Ae",
            symbol: TokenSymbol.WPKtonClassic,
            decimals: 18,
          },
        },
        to: {
          iconSrc: "/images/pkton.svg",
          type: "ERC20",
          options: {
            address: "0x0000000000000000000000000000000000000402",
            symbol: TokenSymbol.PKton,
            decimals: 18,
          },
        },
      },
    ],
    isTextNet: true,
  },
] as ConfigData[];
