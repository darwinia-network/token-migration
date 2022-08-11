import type { PropsWithChildren } from "react";

interface Props {
  className?: string;
  type?: "default" | "primary";
  onClick?: () => void;
  disable?: boolean;
}

const Button = ({ children, className, type, disable, onClick }: PropsWithChildren<Props>) => {
  return (
    <button
      className={`${type === "primary" ? "bg-primary" : "border-[2px] border-primary"} ${
        disable ? "hover:cursor-not-allowed opacity-50" : ""
      } text-sm leading-7 font-light py-2 px-4 ${className}`}
      onClick={onClick}
      disabled={disable}
    >
      {children}
    </button>
  );
};

export default Button;
