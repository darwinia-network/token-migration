import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";

import { useApi } from "../hooks/api";

const SelectedItem = ({ onClick }: { onClick?: MouseEventHandler<HTMLDivElement> }) => {
  return (
    <div className="py-px px-3 bg-black flex items-center hover:cursor-pointer" onClick={onClick}>
      <Image src="/images/not-supported.svg" width={20} height={20} />
      <span className="mx-2 text-sm leading-7 font-light">Not Supported</span>
      <Image src="/images/drop-down.svg" width={16} height={16} />
    </div>
  );
};

const OptionItem = ({ isTextNet }: { isTextNet?: boolean }) => {
  return (
    <div className="flex items-center space-x-3 px-5 py-1 hover:cursor-pointer hover:bg-gray-900">
      <Image src="/images/pangolin-smart-chain.svg" width={30} height={30} />
      <span className="text-sm leading-7 font-light text-[#C6C6C6] tracking-wide">Pangolin Smart Chain</span>
      {isTextNet && (
        <div className="bg-primary">
          <span className="text-[0.7rem] leading-6 font-semibold px-3 py-2">TextNet</span>
        </div>
      )}
    </div>
  );
};

const ChainSlector = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", () => setOpen(false));
  }, []);

  return (
    <div className="relative">
      <SelectedItem
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      />

      <div
        className={`border-[2px] border-primary bg-black z-10 absolute right-0 w-80 py-3 flex flex-col space-y-4 ${
          open ? "" : "hidden"
        }`}
      >
        {[1, 2].map((_, index) => (
          <OptionItem key={index} isTextNet={!!index} />
        ))}
      </div>
    </div>
  );
};

export default ChainSlector;
