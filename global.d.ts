import type { ToastQueue } from "./types";
export declare global {
  interface Window {
    ethereum: any;
    LukyToast?: {
      tid?: number;
      containerDom?: HTMLDivElement;
      add?: (toast: ToastQueue) => void;
    };
  }
}
