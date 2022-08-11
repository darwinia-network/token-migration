import Image from "next/image";
import { useState } from "react";

import CoonectToMetaMask from "./connect-metamask";
import TokenSelector from "./token-selector";
import Button from "./button";
import { toShortAddress } from "../utils";

export default () => {
  const [isConnected, setIsConnected] = useState(true);

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
        <div className="pt-4 px-4 relative" style={{ height: "calc(100% - 4rem)" }}>
          <TokenSelector label="Amount to migrate (Old token)" />
          <TokenSelector label="You receive (New token)" className="mt-5" isForNewToken />

          <div className="absolute bottom-5 left-0 w-full px-4">
            <Button className="w-full">Approve</Button>
          </div>
        </div>
      ) : (
        <CoonectToMetaMask style={{ height: "calc(100% - 4rem)" }} onClick={() => setIsConnected(true)} />
      )}
    </div>
  );
};
