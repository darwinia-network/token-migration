import Image from "next/image";

import Button from "./button";
import { toShortAddress } from "../utils";

export default () => {
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

      <div className="flex flex-col justify-center items-center h-full pb-16 space-y-14">
        <Image src="/images/metamask.svg" width={96} height={86} />
        <Button type="primary">{`Connect to MetaMask >`}</Button>
      </div>
    </div>
  );
};
