import type { WatchAssetParams } from "./metamask";

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

export interface TokenConfig extends WatchAssetParams {
  iconSrc: string;
  isRing: boolean;
}
