import { useEffect } from "react";
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
          <h3 className="text-xl">Transacton {item.type}</h3>
          <p className="text-left break-words mt-4">
            Transcton hash:{" "}
            <a
              href="https://pangolin.subscan.io/tx/0x3f6fd1d16bf892c8b001c62cda482786361821bed20b29470fe1bf13061a05ef"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80"
            >
              0x3f6fd1d16bf892c8b001c62cda482786361821bed20b29470fe1bf13061a05ef
            </a>
          </p>
        </div>
      ))}
    </div>
  );
};
