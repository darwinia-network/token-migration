import React, { MouseEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { BigNumber } from "ethers";

import { LukyButton } from "./LukyButton";
import { Asset, TokenConfig } from "../types";
import { useApi, useTokenBalance } from "../hooks";
import { formatBalance } from "../utils";

const SelectedItem = ({
  open,
  receive,
  tokenConfig,
  onClick,
}: {
  open?: boolean;
  receive?: Asset | null;
  tokenConfig: TokenConfig;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) => {
  const { provider, assets } = useApi();

  const handleAddToMetaMask = useCallback(async () => {
    try {
      if (provider && tokenConfig.options.address) {
        await provider.send("wallet_watchAsset", {
          type: tokenConfig.type,
          options: { ...tokenConfig.options },
        } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
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
        <img alt="..." src={tokenConfig.iconSrc} width={30} height={30} />
        <span className="ml-2 text-sm leading-7 font-light text-secondary">{tokenConfig.options.symbol}</span>
      </div>

      <div className="w-1/3 flex justify-center">
        <span className="text-sm leading-7 font-light text-secondary">
          {formatBalance(
            receive?.balance || assets?.legacy?.balance || BigNumber.from(0),
            receive?.decimals || assets?.legacy?.decimals
          )}
        </span>
      </div>

      <div className="w-1/3 flex justify-end">
        {receive ? (
          <LukyButton onClick={handleAddToMetaMask} disable={!!tokenConfig.disable || !tokenConfig.options.address}>
            Add To MetaMask
          </LukyButton>
        ) : (
          <img
            alt="..."
            src="/images/drop-down.svg"
            width={16}
            height={16}
            className={`${open ? "rotate-180" : "rotate-0"} opacity-80`}
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
  refreshTrigger,
  onSelect = () => undefined,
}: {
  value: number;
  disable?: boolean;
  tokenConfig: TokenConfig;
  refreshTrigger?: boolean;
  onSelect?: (index: number) => void;
}) => {
  const { accounts } = useApi();
  const { balance, refresh } = useTokenBalance(tokenConfig.options.address, accounts ? accounts[0] : null);

  useEffect(() => {
    const sub$$ = refresh();

    return () => sub$$.unsubscribe();
  }, [refreshTrigger]);

  return (
    <div
      className={`flex items-center justify-between h-16 px-4 hover:bg-gray-900 hover:cursor-pointer ${
        disable ? "opacity-50" : ""
      }`}
      onClick={() => onSelect(value)}
    >
      <div className="flex items-center w-1/3">
        <img alt="..." src={tokenConfig.iconSrc} width={30} height={30} />
        <span className="ml-2 text-sm leading-7 font-light text-secondary">{tokenConfig.options.symbol}</span>
      </div>

      <div className="w-1/3 flex justify-center">
        <span className="text-sm leading-7 font-light text-secondary">
          {formatBalance(balance, tokenConfig.options.decimals)}
        </span>
      </div>

      <div className={`w-1/3 ${disable ? "flex justify-end" : "invisible"}`}>
        <div className="border w-fit">
          <span className="text-[0.7rem] leading-6 font-semibold px-3 py-2 text-secondary text">Coming soon</span>
        </div>
      </div>
    </div>
  );
};

interface Props {
  label: string;
  value: number;
  asset?: Asset | null;
  receive?: Asset | null;
  options: (TokenConfig & { disable?: boolean })[];
  refreshTrigger?: boolean;
  className?: string;
  onSelect?: (index: number) => void;
}

export const TokenSelector = ({
  label,
  value,
  options,
  asset,
  receive,
  className,
  refreshTrigger,
  onSelect = () => undefined,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const handleSelect = useCallback(
    (index: number) => {
      setOpen(false);
      onSelect(index);
    },
    [onSelect]
  );

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    });
  }, []);

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="inline-flex items-center justify-between">
        <span className="text-sm leading-7 font-light text-secondary">{label}</span>
        <span className="text-sm leading-7 font-light text-secondary">
          Balance: {`${asset?.balance ? formatBalance(asset.balance, asset.decimals) : "--"}`}
        </span>
      </div>

      <div className="relative" ref={ref}>
        <SelectedItem
          open={open}
          receive={receive}
          tokenConfig={options[value]}
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        />

        <div className={`border border-t-0 absolute left-0 w-full bg-black z-10 ${open ? "" : "hidden"}`}>
          {options.map((item, index) => (
            <OptionItem
              key={index}
              value={index}
              disable={item.disable}
              tokenConfig={item}
              refreshTrigger={refreshTrigger}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
