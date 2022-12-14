import { ChainID, Migrator, TokenSymbol } from "../types";

export const MIGRATORS_CONF: Record<ChainID, Migrator[]> = {
  [ChainID.CrabSmartChain]: [
    {
      from: TokenSymbol.XRingClassic,
      to: TokenSymbol.XWRing,
      contract: "0xdED6Edd731f5F59fEB2555Ec3f1b6C085Dc6E42E",
      methodName: "migrateAll",
      disable: false,
    },
    {
      from: TokenSymbol.WCKtonClassic,
      to: TokenSymbol.CKton,
      contract: "0xD5f4940704Eb4cE5e4b51877d49B58A3e93531b6",
      methodName: "migrate",
      disable: false,
    },
  ],
  // [ChainID.PangolinSmartChain]: [
  //   {
  //     from: TokenSymbol.XORingClassic,
  //     to: TokenSymbol.XWORing,
  //     contract: "",
  //     methodName: "migrateAll",
  //     disable: true,
  //   },
  //   {
  //     from: TokenSymbol.WPKtonClassic,
  //     to: TokenSymbol.PKton,
  //     contract: "0xE3F90f6Fe7c70b1F8cBEbc3477048d4F32E61f07",
  //     methodName: "migrate",
  //     disable: false,
  //   },
  // ],
};
