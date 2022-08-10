import type { PropsWithChildren } from "react";

interface Props {
  className?: string;
  type?: "default" | "primary";
  onClick?: () => void;
}

const Button = ({ children, className, type, onClick }: PropsWithChildren<Props>) => {
  return (
    <button
      className={`${
        type === "primary" ? "bg-primary" : "border-[2px] border-primary"
      } text-sm leading-7 font-light py-2 px-4 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
