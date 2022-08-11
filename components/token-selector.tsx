import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";

import Button from "./button";

interface Props {
  label: string;
  className?: string;
  isForNewToken?: boolean;
}

const SelectedItem = ({
  isForNewToken,
  onClick,
}: {
  isForNewToken?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      className={`mt-2 flex items-center justify-between border backdrop-blur-2xl h-16 px-4 ${
        isForNewToken ? "cursor-not-allowed" : "hover:cursor-pointer"
      }`}
      onClick={isForNewToken ? undefined : onClick}
    >
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
  );
};

const OptionItem = () => {
  return (
    <div className="flex items-center justify-between h-16 px-4 hover:cursor-pointer hover:bg-gray-900">
      <div className="flex items-center w-1/3">
        <Image src="/images/x-wring.svg" width={30} height={30} />
        <span className="ml-2 text-sm leading-7 font-light">xRing(Classic)</span>
      </div>

      <div className="w-1/3 flex justify-center">
        <span className="text-sm leading-7 font-light">0</span>
      </div>

      <div className="w-1/3 invisible"></div>
    </div>
  );
};

const Selector = ({ isForNewToken }: { isForNewToken?: boolean }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", () => setOpen(false));
  }, []);

  return (
    <div className="relative">
      <SelectedItem
        isForNewToken={isForNewToken}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      />

      <div className={`border border-t-0 absolute top-[4.5rem] left-0 w-full bg-black z-10 ${open ? "" : "hidden"}`}>
        {[1, 2].map((_, index) => (
          <OptionItem key={index} />
        ))}
      </div>
    </div>
  );
};

const TokenSelector = ({ label, className, isForNewToken }: Props) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="inline-flex items-center justify-between">
        <span className="text-sm leading-7 font-light">{label}</span>
        <span className="text-sm leading-7 font-light">Balance: --</span>
      </div>

      <Selector isForNewToken={isForNewToken} />
    </div>
  );
};

export default TokenSelector;
