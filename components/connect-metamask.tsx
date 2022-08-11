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
      <Button type="primary" onClick={onClick}>{`Connect to MetaMask >`}</Button>
    </div>
  );
};

export default CoonectToMetaMask;
