import Image from "next/image";
import { CSSProperties } from "react";

import Button from "./button";

const CoonectToMetaMask = ({
  className,
  style,
  onClick,
}: {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}) => {
  return (
    <div className={`flex flex-col justify-center items-center space-y-14 ${className}`} style={style}>
      <Image src="/images/metamask.svg" width={96} height={86} />
      {typeof window.ethereum !== "undefined" ? (
        <Button type="primary" onClick={onClick}>{`Connect to MetaMask >`}</Button>
      ) : (
        <a
          href="https://metamask.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="border-[2px] border-primary text-sm leading-7 font-light py-2 px-6"
        >{`Install MetaMask >`}</a>
      )}
    </div>
  );
};

export default CoonectToMetaMask;
