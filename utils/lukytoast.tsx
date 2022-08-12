import type { ReactNode } from "react";
import * as ReactDom from "react-dom/client";

import type { ToastQueue } from "../types";
import { LukyToastContainer } from "../components/LukyToastContainer";

const dispatchToast = (toast: ToastQueue) => {
  if (window.LukyToast?.containerDom && window.LukyToast.add) {
    window.LukyToast.add(toast);
  } else {
    const containerDom = document.createElement("div");
    document.body.appendChild(containerDom);
    window.LukyToast = { ...window.LukyToast, containerDom };
    ReactDom.createRoot(containerDom).render(<LukyToastContainer toast={toast} />);
  }
};

export const lukytoast = {
  success: ({ content }: { content: ReactNode }) => dispatchToast({ content, type: "success" }),
  warning: ({ content }: { content: ReactNode }) => dispatchToast({ content, type: "warning" }),
  error: ({ content }: { content: ReactNode }) => dispatchToast({ content, type: "error" }),
};