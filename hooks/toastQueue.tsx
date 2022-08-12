import { useState } from "react";
import type { ToastQueue } from "../types";

export const useToastQueue = () => {
  const [queue, setQueue] = useState<ToastQueue[]>([]);

  const getName = () => {
    const id = window.LukyToastId || 0;
    window.LukyToastId = id + 1;
    return `__toast_id_${id}`;
  };

  const add = (item: ToastQueue) => {
    const _tid = getName();
    const toast = { _tid, duration: 3000, ...item };

    setQueue((v) => [...v, toast]);
    setTimeout(() => {
      setQueue((v) => v.filter((el) => el._tid !== toast._tid));
    }, toast.duration);
  };

  window.LukyToastAdd = add;

  return { queue };
};
