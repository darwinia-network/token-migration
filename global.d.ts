import type { ToastQueue } from "./types";
export declare global {
  interface Window {
    ethereum: any;
    LukyToastId: number;
    LukyToastContainerDom: HTMLDivElement;
    LukyToastAdd: (toast: ToastQueue) => void;
  }
}
