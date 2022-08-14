import type { TokenSymbol } from "./token";

export interface Migrator {
  from: TokenSymbol;
  to: TokenSymbol;
  contract: string; // migrator contract address
  disable?: boolean;
}
