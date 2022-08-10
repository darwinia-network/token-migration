import Image from "next/image";

import Button from "./button";

interface Props {
  label: string;
  className?: string;
  isForNewToken?: boolean;
}

const TokenSelector = ({ label, className, isForNewToken }: Props) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="inline-flex items-center justify-between">
        <span className="text-sm leading-7 font-light">{label}</span>
        <span className="text-sm leading-7 font-light">Balance: --</span>
      </div>

      <div className="mt-2 flex items-center justify-between border backdrop-blur-2xl h-16 px-4">
        <div className="flex items-center w-1/3">
          <Image src="/images/x-wring.svg" width={30} height={30} />
          <span className="ml-2 text-sm leading-7 font-light">xRing(Classic)</span>
        </div>

        <div className="w-1/3 flex justify-center">
          <span className="text-sm leading-7 font-light">0</span>
        </div>

        <div className="w-1/3 flex justify-end">
          {isForNewToken ? (
            <Button>Add To MetaMask</Button>
          ) : (
            <Image src="/images/drop-down.svg" width={16} height={16} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenSelector;
