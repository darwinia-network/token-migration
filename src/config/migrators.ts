import { ChainID, Migrator, TokenSymbol } from "../types";

export const MIGRATORS_CONF: Record<ChainID, Migrator[]> = {
  [ChainID.CrabSmartChain]: [
    {
      from: TokenSymbol.XRingClassic,
      to: TokenSymbol.XWRing,
      contract: "",
      disable: true,
    },
    {
      from: TokenSymbol.WCKtonClassic,
      to: TokenSymbol.CKton,
      contract: "0xD5f4940704Eb4cE5e4b51877d49B58A3e93531b6",
      disable: false,
    },
  ],
  [ChainID.PangolinSmartChain]: [
    {
      from: TokenSymbol.XORingClassic,
      to: TokenSymbol.XWORing,
      contract: "",
      disable: true,
    },
    {
      from: TokenSymbol.WPKtonClassic,
      to: TokenSymbol.PKton,
      contract: "0xE3F90f6Fe7c70b1F8cBEbc3477048d4F32E61f07",
      disable: false,
    },
  ],
};
