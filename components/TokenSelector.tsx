import Image from "next/image";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { BigNumber, utils } from "ethers";

import { LukyButton } from "./LukyButton";
import { TokenConfig } from "../types";
import { useApi, useKtonBalance } from "../hooks";

const SelectedItem = ({
  open,
  receive,
  tokenConfig,
  onClick,
}: {
  open?: boolean;
  receive?: BigNumber | null;
  tokenConfig: TokenConfig;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) => {
  const { provider, accounts } = useApi();
  const { balance } = useKtonBalance(tokenConfig.options.address, accounts ? accounts[0] : null);

  const handleAddToMetaMask = useCallback(async () => {
    try {
      if (provider && tokenConfig.options.address) {
        await provider.send("wallet_watchAsset", {
          type: tokenConfig.type,
          options: { ...tokenConfig.options },
        } as any);
      }
    } catch (err) {
      console.error("Add to MetaMask:", err);
    }
  }, [provider, tokenConfig]);

  return (
    <div
      className={`mt-2 flex items-center justify-between border backdrop-blur-2xl h-16 px-4 ${
        receive ? "" : "hover:opacity-80 hover:cursor-pointer"
      }`}
      onClick={receive ? undefined : onClick}
    >
      <div className="flex items-center w-1/3">
        <Image alt="..." src={tokenConfig.iconSrc} width={30} height={30} />
        <span className="ml-2 text-sm leading-7 font-light">{tokenConfig.options.symbol}</span>
      </div>

      <div className="w-1/3 flex justify-center">
        <span className="text-sm leading-7 font-light">{utils.formatEther(receive ?? balance)}</span>
      </div>

      <div className="w-1/3 flex justify-end">
        {receive ? (
          <LukyButton onClick={handleAddToMetaMask} disable={!tokenConfig.options.address || tokenConfig.isRing}>
            Add To MetaMask
          </LukyButton>
        ) : (
          <Image
            alt="..."
            src="/images/drop-down.svg"
            width={16}
            height={16}
            className={`${open ? "rotate-180" : "rotate-0"}`}
          />
        )}
      </div>
    </div>
  );
};

const OptionItem = ({
  value,
  disable,
  tokenConfig,
  onSelect = () => undefined,
}: {
  value: number;
  disable?: boolean;
  tokenConfig: TokenConfig;
  onSelect?: (index: number) => void;
}) => {
  const { accounts } = useApi();
  const { balance } = useKtonBalance(tokenConfig.options.address, accounts ? accounts[0] : null);

  return (
    <div
      className={`flex items-center justify-between h-16 px-4 hover:bg-gray-900 hover:cursor-pointer ${
        disable ? "opacity-50" : ""
      }`}
      onClick={() => onSelect(value)}
    >
      <div className="flex items-center w-1/3">
        <Image alt="..." src={tokenConfig.iconSrc} width={30} height={30} />
        <span className="ml-2 text-sm leading-7 font-light">{tokenConfig.options.symbol}</span>
      </div>

      <div className="w-1/3 flex justify-center">
        <span className="text-sm leading-7 font-light">{utils.formatEther(balance)}</span>
      </div>

      <div className="w-1/3 invisible"></div>
    </div>
  );
};

interface Props {
  label: string;
  value: number;
  balance?: BigNumber | null;
  receive?: BigNumber | null;
  options: (TokenConfig & { disable?: boolean })[];
  className?: string;
  onSelect?: (index: number) => void;
}

export const TokenSelector = ({ label, value, options, balance, receive, className, onSelect }: Props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", () => setOpen(false));
  }, []);

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="inline-flex items-center justify-between">
        <span className="text-sm leading-7 font-light">{label}</span>
        <span className="text-sm leading-7 font-light">
          Balance: {`${balance ? utils.formatEther(balance) : "--"}`}
        </span>
      </div>

      <div className="relative">
        <SelectedItem
          open={open}
          receive={receive}
          tokenConfig={options[value]}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
        />

        <div className={`border border-t-0 absolute left-0 w-full bg-black z-10 ${open ? "" : "hidden"}`}>
          {options.map((item, index) => (
            <OptionItem key={index} value={index} disable={item.disable} tokenConfig={item} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </div>
  );
};
