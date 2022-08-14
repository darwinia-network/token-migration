import type { ReactNode } from "react";

export interface ToastQueue {
  _tid?: string;
  duration?: number;
  title: ReactNode;
  content?: ReactNode;
  // type: "success" | "warning" | "error";
}
