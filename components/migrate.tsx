import Image from "next/image";
import { useState } from "react";

import CoonectToMetaMask from "./connect-metamask";
import TokenSelector from "./token-selector";
import { toShortAddress } from "../utils";

export default () => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="border-[2px] border-primary h-full">
      <div className="bg-primary h-16 flex justify-between items-center px-4">
        <span className="text-xl font-bold">Migrate Now</span>
        <div className="flex items-center space-x-2">
          <div className="py-px px-3 bg-black flex items-center">
            <Image src="/images/not-supported.svg" width={20} height={20} />
            <span className="mx-2 text-sm leading-7 font-light">Not Supported</span>
            <Image src="/images/drop-down.svg" width={16} height={16} />
          </div>
          <div className="py-px px-3 bg-black">
            <span className="text-sm leading-7 font-light">
              {toShortAddress("0xf422673CB7a673f595852f7B00906408A0b073db")}
            </span>
          </div>
        </div>
      </div>

      {isConnected ? (
        <div className="pt-4 pb-2 px-4">
          <TokenSelector label="Amount to migrate (Old token)" />
          <TokenSelector label="You receive (New token)" className="mt-5" isForNewToken />
        </div>
      ) : (
        <CoonectToMetaMask className="h-full pb-16" onClick={() => setIsConnected(true)} />
      )}
    </div>
  );
};
