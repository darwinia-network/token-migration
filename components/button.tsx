import type { PropsWithChildren } from "react";

interface Props {
  className?: string;
  type?: "default" | "primary";
}

const Button = ({ children, className, type }: PropsWithChildren<Props>) => {
  return (
    <button
      className={`${
        type === "primary" ? "bg-primary" : "border-primary"
      } text-sm leading-7 font-light py-2 px-4 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
