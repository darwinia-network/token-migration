import type { BigNumber } from "ethers";
import { WatchAssetOption } from "./metamask";

export interface Asset extends Pick<WatchAssetOption, "decimals"> {
  balance: BigNumber | null;
}
