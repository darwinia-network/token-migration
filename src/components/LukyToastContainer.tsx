import React, { useEffect } from "react";
import { useToastQueue } from "../hooks";
import type { ToastQueue } from "../types";

export const LukyToastContainer = ({ toast }: { toast?: ToastQueue }) => {
  const { queue } = useToastQueue();

  useEffect(() => {
    if (toast && window.LukyToast?.add) {
      window.LukyToast.add(toast);
    }
  }, [toast]);

  if (queue.length <= 0) {
    return null;
  }

  return (
    <div className="bg-black fixed top-12 right-8">
      {queue.map((item, index) => (
        <div key={index} className="border p-4 w-96 mt-4">
          <h3 className="text-xl">{item.title}</h3>
          <div className="mt-4">{item.content}</div>
        </div>
      ))}
    </div>
  );
};
