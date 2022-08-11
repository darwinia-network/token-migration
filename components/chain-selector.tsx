import Image from "next/image";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";

import { useApi } from "../hooks/api";
import { config } from "../config";

const SelectedItem = ({
  label,
  iconSrc,
  onClick,
}: {
  iconSrc: string;
  label: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div className="py-px px-3 bg-black flex items-center hover:cursor-pointer" onClick={onClick}>
      <Image alt="..." src={iconSrc} width={20} height={20} />
      <span className="mx-2 text-sm leading-7 font-light">{label}</span>
      <Image alt="..." src="/images/drop-down.svg" width={16} height={16} />
    </div>
  );
};

const OptionItem = ({
  iconSrc,
  label,
  isTextNet,
  value,
  onSelect,
}: {
  iconSrc: string;
  label: string;
  isTextNet?: boolean;
  value: string;
  onSelect: (v: string) => void;
}) => {
  return (
    <div
      className="flex items-center space-x-3 px-5 py-1 hover:cursor-pointer hover:bg-gray-900"
      onClick={() => onSelect(value)}
    >
      <Image alt="..." src={iconSrc} width={30} height={30} />
      <span className="text-sm leading-7 font-light text-[#C6C6C6] tracking-wide">{label}</span>
      {isTextNet && (
        <div className="bg-primary">
          <span className="text-[0.7rem] leading-6 font-semibold px-3 py-2">TextNet</span>
        </div>
      )}
    </div>
  );
};

const ChainSlector = () => {
  const { migration, setMigration } = useApi();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", () => setOpen(false));
  }, []);

  const handleSelect = useCallback(
    async (chainId: string) => {
      const found = config.find((item) => item.chainParam.chainId === chainId);

      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId }],
        });

        if (found) {
          setMigration(found);
        }
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if ((switchError as { code: number }).code === 4902 && found) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [{ ...found.chainParam }],
            });

            setMigration(found);
          } catch (addError) {
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }
    },
    [setMigration]
  );

  return (
    <div className="relative">
      <SelectedItem
        iconSrc={migration ? migration.logoSrc : "/images/not-supported.svg"}
        label={migration ? migration.chainParam.chainName : "Not Supported"}
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
        {config.map((item, index) => (
          <OptionItem
            key={index}
            iconSrc={item.logoSrc}
            value={item.chainParam.chainId}
            label={item.chainParam.chainName}
            isTextNet={item.isTextNet}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default ChainSlector;
