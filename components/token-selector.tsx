import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";
import { Contract, BigNumber } from "ethers";
import { from, Subscription } from "rxjs";

import Button from "./button";
import { TokenInfo } from "../types";
import { useApi } from "../hooks/api";
import ktonAbi from "../abi/ktonABI.json";

interface Props {
  label: string;
  className?: string;
  isForNewToken?: boolean;
  tokens: TokenInfo[];
  defaultValue?: TokenInfo;
  onSelect?: (index: number) => void;
}

const SelectedItem = ({
  isForNewToken,
  onClick,
  iconSrc,
  symbol,
  contractAddress,
}: {
  isForNewToken?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  iconSrc: string;
  symbol: string;
  contractAddress?: string;
}) => {
  const { provider, accounts } = useApi();
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    let sub$$: Subscription;

    if (contractAddress && provider && accounts?.length) {
      const contract = new Contract(contractAddress, ktonAbi, provider);

      sub$$ = from(contract.balanceOf(accounts[0]) as Promise<BigNumber>).subscribe((amount) => {
        setBalance(amount.toString());
      });
    } else {
      setBalance("0");
    }

    return () => {
      if (sub$$) {
        sub$$.unsubscribe();
      }
    };
  }, [contractAddress, provider, accounts]);

  return (
    <div
      className={`mt-2 flex items-center justify-between border backdrop-blur-2xl h-16 px-4 ${
        isForNewToken ? "cursor-not-allowed" : "hover:cursor-pointer"
      }`}
      onClick={isForNewToken ? undefined : onClick}
    >
      <div className="flex items-center w-1/3">
        <Image alt="..." src={iconSrc} width={30} height={30} />
        <span className="ml-2 text-sm leading-7 font-light">{symbol}</span>
      </div>

      <div className="w-1/3 flex justify-center">
        <span className="text-sm leading-7 font-light">{balance}</span>
      </div>

      <div className="w-1/3 flex justify-end">
        {isForNewToken ? (
          <Button>Add To MetaMask</Button>
        ) : (
          <Image alt="..." src="/images/drop-down.svg" width={16} height={16} />
        )}
      </div>
    </div>
  );
};

const OptionItem = ({
  iconSrc,
  symbol,
  disable,
  value,
  contractAddress,
  onSelect,
}: {
  iconSrc: string;
  symbol: string;
  disable?: boolean;
  value: string;
  contractAddress?: string;
  onSelect: (symbol: string) => void;
}) => {
  const { provider, accounts } = useApi();
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    let sub$$: Subscription;

    if (contractAddress && provider && accounts?.length) {
      const contract = new Contract(contractAddress, ktonAbi, provider);

      sub$$ = from(contract.balanceOf(accounts[0]) as Promise<BigNumber>).subscribe((amount) => {
        setBalance(amount.toString());
      });
    } else {
      setBalance("0");
    }

    return () => {
      if (sub$$) {
        sub$$.unsubscribe();
      }
    };
  }, [contractAddress, provider, accounts]);

  return (
    <div
      className={`flex items-center justify-between h-16 px-4 hover:bg-gray-900 ${
        disable ? "opacity-50 hover:cursor-not-allowed" : "hover:cursor-pointer"
      }`}
      onClick={disable ? undefined : () => onSelect(value)}
    >
      <div className="flex items-center w-1/3">
        <Image alt="..." src={iconSrc} width={30} height={30} />
        <span className="ml-2 text-sm leading-7 font-light">{symbol}</span>
      </div>

      <div className="w-1/3 flex justify-center">
        <span className="text-sm leading-7 font-light">{balance}</span>
      </div>

      <div className="w-1/3 invisible"></div>
    </div>
  );
};

const Selector = ({
  isForNewToken,
  defaultValue,
  tokens,
  onSelect,
}: {
  isForNewToken?: boolean;
  defaultValue?: TokenInfo;
  tokens: TokenInfo[];
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
        isForNewToken={isForNewToken}
        iconSrc={tokens[selected]?.iconSrc || defaultValue?.iconSrc || ""}
        symbol={tokens[selected]?.symbol || defaultValue?.symbol || ""}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      />

      <div className={`border border-t-0 absolute left-0 w-full bg-black z-10 ${open ? "" : "hidden"}`}>
        {tokens.map((item, index) => (
          <OptionItem
            key={index}
            value={item.symbol}
            iconSrc={item.iconSrc}
            symbol={item.symbol}
            disable={item.disable}
            contractAddress={item.contractAddress}
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

const TokenSelector = ({ label, className, isForNewToken, defaultValue, tokens, onSelect }: Props) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="inline-flex items-center justify-between">
        <span className="text-sm leading-7 font-light">{label}</span>
        <span className="text-sm leading-7 font-light">Balance: --</span>
      </div>

      <Selector isForNewToken={isForNewToken} defaultValue={defaultValue} tokens={tokens} onSelect={onSelect} />
    </div>
  );
};

export default TokenSelector;
