import Image from "next/image";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import { providers } from "ethers";

import Button from "./button";

const CoonectToMetaMask = ({
  className,
  style,
  onConnect,
}: {
  className?: string;
  style?: CSSProperties;
  onConnect?: ({}: { provider: providers.Web3Provider; accounts: string[] }) => void;
}) => {
  const [isInstalled, setIsInstalled] = useState(false);

  const handleConnectMetamask = useCallback(async () => {
    const provider = new providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);

    if (onConnect) {
      onConnect({
        accounts,
        provider,
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setIsInstalled(true);
    } else {
      setIsInstalled(false);
    }
  }, []);

  return (
    <div className={`flex flex-col justify-center items-center space-y-14 ${className}`} style={style}>
      <Image src="/images/metamask.svg" width={96} height={86} />
      {isInstalled ? (
        <Button type="primary" onClick={handleConnectMetamask}>{`Connect to MetaMask >`}</Button>
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
