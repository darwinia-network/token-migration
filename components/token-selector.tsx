import Image from "next/image";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { BigNumber, utils } from "ethers";

import Button from "./button";
import { TokenInfo } from "../types";
import { useApi, useKtonBalance } from "../hooks";

interface Props {
  label: string;
  className?: string;
  isForNewToken?: boolean;
  tokens: TokenInfo[];
  defaultValue?: TokenInfo;
  balance?: BigNumber | null;
  receive?: BigNumber | null;
  onSelect?: (index: number) => void;
}

const SelectedItem = ({
  isForNewToken,
  onClick,
  token,
  receive,
}: {
  isForNewToken?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  token: TokenInfo;
  receive?: BigNumber | null;
}) => {
  const { provider, accounts } = useApi();
  const { balance } = useKtonBalance(token.options.address, accounts ? accounts[0] : null);

  const handleAddToMetaMask = useCallback(async () => {
    try {
      if (provider && token.options.address) {
        await provider.send("wallet_watchAsset", { type: token.type, options: { ...token.options } } as any);
      }
    } catch (err) {
      console.error("Add to MetaMask:", err, token);
    }
  }, [provider, token]);

  return (
    <div
      className={`mt-2 flex items-center justify-between border backdrop-blur-2xl h-16 px-4 ${
        isForNewToken ? "cursor-not-allowed" : "hover:cursor-pointer"
      }`}
      onClick={isForNewToken ? undefined : onClick}
    >
      <div className="flex items-center w-1/3">
        <Image alt="..." src={token.iconSrc} width={30} height={30} />
        <span className="ml-2 text-sm leading-7 font-light">{token.options.symbol}</span>
      </div>

      <div className="w-1/3 flex justify-center">
        <span className="text-sm leading-7 font-light">{utils.formatEther(receive ?? balance)}</span>
      </div>

      <div className="w-1/3 flex justify-end">
        {isForNewToken ? (
          <Button onClick={handleAddToMetaMask} disable={!token.options.address || token.disable}>
            Add To MetaMask
          </Button>
        ) : (
          <Image alt="..." src="/images/drop-down.svg" width={16} height={16} />
        )}
      </div>
    </div>
  );
};

const OptionItem = ({
  value,
  token,
  onSelect,
}: {
  value: string;
  token: TokenInfo;
  onSelect: (symbol: string) => void;
}) => {
  const { accounts } = useApi();
  const { balance } = useKtonBalance(token.options.address, accounts ? accounts[0] : null);

  return (
    <div
      className={`flex items-center justify-between h-16 px-4 hover:bg-gray-900 ${
        token.disable ? "opacity-50 hover:cursor-not-allowed" : "hover:cursor-pointer"
      }`}
      onClick={token.disable ? undefined : () => onSelect(value)}
    >
      <div className="flex items-center w-1/3">
        <Image alt="..." src={token.iconSrc} width={30} height={30} />
        <span className="ml-2 text-sm leading-7 font-light">{token.options.symbol}</span>
      </div>

      <div className="w-1/3 flex justify-center">
        <span className="text-sm leading-7 font-light">{utils.formatEther(balance)}</span>
      </div>

      <div className="w-1/3 invisible"></div>
    </div>
  );
};

const Selector = ({
  isForNewToken,
  defaultValue,
  tokens,
  receive,
  onSelect,
}: {
  isForNewToken?: boolean;
  defaultValue?: TokenInfo;
  tokens: TokenInfo[];
  receive?: BigNumber | null;
  onSelect?: (index: number) => void;
}) => {
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    document.addEventListener("click", () => setOpen(false));
  }, []);

  return (
    <div className="relative">
      <SelectedItem
        receive={receive}
        isForNewToken={isForNewToken}
        token={tokens[selected] || defaultValue}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      />

      <div className={`border border-t-0 absolute left-0 w-full bg-black z-10 ${open ? "" : "hidden"}`}>
        {tokens.map((token, index) => (
          <OptionItem
            key={index}
            token={token}
            value={token.options.symbol}
            onSelect={() => {
              setSelected(index);
              if (onSelect) {
                onSelect(index);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

const TokenSelector = ({
  label,
  className,
  isForNewToken,
  defaultValue,
  tokens,
  balance,
  receive,
  onSelect,
}: Props) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="inline-flex items-center justify-between">
        <span className="text-sm leading-7 font-light">{label}</span>
        <span className="text-sm leading-7 font-light">
          Balance: {`${balance ? utils.formatEther(balance) : "--"}`}
        </span>
      </div>

      <Selector
        isForNewToken={isForNewToken}
        defaultValue={defaultValue}
        tokens={tokens}
        receive={receive}
        onSelect={onSelect}
      />
    </div>
  );
};

export default TokenSelector;
