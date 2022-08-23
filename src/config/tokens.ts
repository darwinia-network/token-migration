import { TokenSymbol, TokenConfig } from "../types";

export const TOKENS_CONF: Record<TokenSymbol, TokenConfig> = {
  // Crab Smart Chain

  [TokenSymbol.XRingClassic]: {
    type: "ERC20",
    options: {
      address: "",
      symbol: TokenSymbol.XRingClassic,
      decimals: 18,
    },
    iconSrc: "/images/x-wring.svg",
    isRing: true,
  },
  [TokenSymbol.XWRing]: {
    type: "ERC20",
    options: {
      address: "",
      symbol: TokenSymbol.XWRing,
      decimals: 18,
    },
    iconSrc: "/images/x-wring.svg",
    isRing: true,
  },

  [TokenSymbol.WCKtonClassic]: {
    type: "ERC20",
    options: {
      address: "0x159933c635570d5042723359fbd1619dfe83d3f3",
      symbol: TokenSymbol.WCKtonClassic,
      decimals: 18,
    },
    iconSrc: "/images/ckton.svg",
    isRing: false,
  },
  [TokenSymbol.CKton]: {
    type: "ERC20",
    options: {
      address: "0x0000000000000000000000000000000000000402",
      symbol: TokenSymbol.CKton,
      decimals: 18,
    },
    iconSrc: "/images/ckton.svg",
    isRing: false,
  },

  // Pangolin Smart Chain

  [TokenSymbol.XORingClassic]: {
    type: "ERC20",
    options: {
      address: "",
      symbol: TokenSymbol.XORingClassic,
      decimals: 18,
    },
    iconSrc: "/images/x-wpring.svg",
    isRing: true,
  },
  [TokenSymbol.XWORing]: {
    type: "ERC20",
    options: {
      address: "",
      symbol: TokenSymbol.XWORing,
      decimals: 18,
    },
    iconSrc: "/images/x-wpring.svg",
    isRing: true,
  },

  [TokenSymbol.WPKtonClassic]: {
    type: "ERC20",
    options: {
      address: "0x8809f9b3ACEF1dA309f49b5Ab97A4C0faA64E6Ae",
      symbol: TokenSymbol.WPKtonClassic,
      decimals: 18,
    },
    iconSrc: "/images/pkton.svg",
    isRing: false,
  },
  [TokenSymbol.PKton]: {
    type: "ERC20",
    options: {
      address: "0x0000000000000000000000000000000000000402",
      symbol: TokenSymbol.PKton,
      decimals: 18,
    },
    iconSrc: "/images/pkton.svg",
    isRing: false,
  },
};
