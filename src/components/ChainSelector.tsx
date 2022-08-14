import { utils } from "ethers";
import React, { MouseEventHandler, useCallback, useEffect, useMemo, useState } from "react";

import { useApi } from "../hooks";
import { ChainID } from "../types";
import { CHAINS_CONF } from "../config";

const SelectedItem = ({
  open,
  label,
  iconSrc,
  onClick,
}: {
  open?: boolean;
  label: string;
  iconSrc: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div className="py-px px-3 bg-black flex items-center hover:cursor-pointer hover:opacity-80" onClick={onClick}>
      <img alt="..." src={iconSrc} width={20} height={20} />
      <span className="mx-2 text-sm leading-7 font-light">{label}</span>
      <img
        alt="..."
        src="/images/drop-down.svg"
        width={16}
        height={16}
        className={`${open ? "rotate-180" : "rotate-0"}`}
      />
    </div>
  );
};

const OptionItem = ({
  value,
  label,
  disable,
  iconSrc,
  isTextNet,
  onSelect,
}: {
  value: ChainID;
  label: string;
  iconSrc: string;
  disable?: boolean;
  isTextNet?: boolean;
  onSelect: (chainId: ChainID) => void;
}) => {
  return (
    <div
      className={`flex items-center space-x-3 px-5 py-1 hover:bg-gray-900 hover:cursor-pointer ${
        disable ? "opacity-50" : ""
      }`}
      onClick={() => onSelect(value)}
    >
      <img alt="..." src={iconSrc} width={30} height={30} />
      <span className="text-sm leading-7 font-light text-[#C6C6C6] tracking-wide">{label}</span>
      {isTextNet && (
        <div className="bg-primary">
          <span className="text-[0.7rem] leading-6 font-semibold px-3 py-2">TextNet</span>
        </div>
      )}
    </div>
  );
};

export const ChainSlector = () => {
  const { currentChain } = useApi();
  const [open, setOpen] = useState(false);

  const currentChainConfig = useMemo(
    () => currentChain !== null && CHAINS_CONF[currentChain as ChainID],
    [currentChain]
  );

  const handleSelect = useCallback(async (chainId: ChainID) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: utils.hexlify(chainId) }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if ((switchError as { code: number }).code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{ ...CHAINS_CONF[chainId] }],
          });
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", () => setOpen(false));
  }, []);

  return (
    <div className="relative">
      <SelectedItem
        open={open}
        iconSrc={currentChainConfig ? currentChainConfig.logoSrc : "/images/not-supported.svg"}
        label={currentChainConfig ? currentChainConfig.chainName : "Not Supported"}
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
        {Object.values(CHAINS_CONF)
          .sort((item) => (item.isTextNet ? 1 : -1))
          .map((item, index) => (
            <OptionItem
              value={Number(item.chainId)}
              key={index}
              label={item.chainName}
              disable={item.disable}
              iconSrc={item.logoSrc}
              isTextNet={item.isTextNet}
              onSelect={handleSelect}
            />
          ))}
      </div>
    </div>
  );
};
