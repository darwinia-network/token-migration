import Image from "next/image";

import Button from "./button";

export default () => {
  return (
    <div className="border-[2px] border-primary h-full">
      <div className="bg-primary h-16 flex flex-col justify-center items-start px-4">
        <span className="text-xl font-bold">Migrate Now</span>
      </div>

      <div className="flex flex-col justify-center items-center h-full pb-16 space-y-14">
        <Image src="/images/metamask.svg" width={96} height={86} />
        <Button type="primary">{`Connect to MetaMask >`}</Button>
      </div>
    </div>
  );
};
