import { useState } from "react";
import type { ToastQueue } from "../types";

export const useToastQueue = () => {
  const [queue, setQueue] = useState<ToastQueue[]>([]);

  const getName = () => {
    const id = window.LukyToast?.tid || 0;
    window.LukyToast = { ...window.LukyToast, tid: id + 1 };
    return `__toast_id_${id}`;
  };

  const add = (item: ToastQueue) => {
    const _tid = getName();
    const toast = { _tid, duration: 6000, ...item };

    setQueue((v) => [...v, toast]);
    setTimeout(() => {
      setQueue((v) => v.filter((el) => el._tid !== toast._tid));
    }, toast.duration);
  };

  window.LukyToast = { ...window.LukyToast, add };

  return { queue };
};
