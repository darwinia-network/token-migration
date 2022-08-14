import type { WatchAssetParams } from "./metamask";

export enum TokenSymbol {
  XWRing = "xWRING",
  XWPRing = "xWPRING",
  CKton = "CKTON",
  PKton = "PKTON",
  XRingClassic = "xRING(Classic)",
  XPRingClassic = "xPRING(Classic)",
  WCKtonClassic = "WCKTON(Classic)",
  WPKtonClassic = "WPKTON(Classic)",
}

export interface TokenConfig extends WatchAssetParams {
  iconSrc: string;
  isRing: boolean;
}
