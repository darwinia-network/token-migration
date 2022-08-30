import { TokenSymbol, TokenConfig } from "../types";

export const TOKENS_CONF: Record<TokenSymbol, TokenConfig> = {
  // Crab Smart Chain

  [TokenSymbol.XRingClassic]: {
    type: "ERC20",
    options: {
      address: "0x7399Ea6C9d35124d893B8d9808930e9d3F211501",
      symbol: TokenSymbol.XRingClassic,
      decimals: 9,
    },
    iconSrc: "/images/x-wring.svg",
  },
  [TokenSymbol.XWRing]: {
    type: "ERC20",
    options: {
      address: "0xccFd19aA2A321e46CE62ad7740C58a79e4276f79",
      symbol: TokenSymbol.XWRing,
      decimals: 18,
    },
    iconSrc: "/images/x-wring.svg",
  },

  [TokenSymbol.WCKtonClassic]: {
    type: "ERC20",
    options: {
      address: "0x159933c635570d5042723359fbd1619dfe83d3f3",
      symbol: TokenSymbol.WCKtonClassic,
      decimals: 18,
    },
    iconSrc: "/images/ckton.svg",
  },
  [TokenSymbol.CKton]: {
    type: "ERC20",
    options: {
      address: "0x0000000000000000000000000000000000000402",
      symbol: TokenSymbol.CKton,
      decimals: 18,
    },
    iconSrc: "/images/ckton.svg",
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
  },
  [TokenSymbol.XWORing]: {
    type: "ERC20",
    options: {
      address: "",
      symbol: TokenSymbol.XWORing,
      decimals: 18,
    },
    iconSrc: "/images/x-wpring.svg",
  },

  [TokenSymbol.WPKtonClassic]: {
    type: "ERC20",
    options: {
      address: "0x8809f9b3ACEF1dA309f49b5Ab97A4C0faA64E6Ae",
      symbol: TokenSymbol.WPKtonClassic,
      decimals: 18,
    },
    iconSrc: "/images/pkton.svg",
  },
  [TokenSymbol.PKton]: {
    type: "ERC20",
    options: {
      address: "0x0000000000000000000000000000000000000402",
      symbol: TokenSymbol.PKton,
      decimals: 18,
    },
    iconSrc: "/images/pkton.svg",
  },
};
