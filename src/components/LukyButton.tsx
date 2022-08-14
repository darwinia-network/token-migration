import React, { PropsWithChildren } from "react";

interface Props {
  className?: string;
  type?: "default" | "primary";
  onClick?: () => void;
  disable?: boolean;
  loading?: boolean;
}

export const LukyButton = ({ children, className, type, disable, loading, onClick }: PropsWithChildren<Props>) => {
  return (
    <button
      className={`${type === "primary" ? "bg-primary" : "border-[2px] border-primary"} ${
        disable || loading ? "hover:cursor-not-allowed opacity-50" : ""
      } text-sm leading-7 font-light py-2 px-4 hover:bg-white hover:text-black hover:border-white relative ${className}`}
      onClick={onClick}
      disabled={disable || loading}
      type="button"
    >
      {loading && (
        <span className="w-6 h-6 border-4 border-t-gray-700 border-r-gray-700 border-b-gray-100 border-l-gray-100 rounded-full transition-transform animate-spin absolute left-0 right-0 top-0 bottom-0 m-auto" />
      )}
      {children}
    </button>
  );
};
