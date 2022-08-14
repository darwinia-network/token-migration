import type { ToastQueue } from "./types";
export declare global {
  interface Window {
    ethereum: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    LukyToast?: {
      tid?: number;
      containerDom?: HTMLDivElement;
      add?: (toast: ToastQueue) => void;
    };
  }
}
