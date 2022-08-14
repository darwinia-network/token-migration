import React, { CSSProperties } from "react";

import { useApi } from "../hooks";
import { LukyButton } from "./LukyButton";

export const ConnectMetamask = ({ className, style }: { className?: string; style?: CSSProperties }) => {
  const { provider, requestAccounts } = useApi();

  return (
    <div className={`flex flex-col justify-center items-center space-y-14 ${className}`} style={style}>
      <img alt="..." src="/images/metamask.svg" width={96} height={86} />
      {provider ? (
        <LukyButton type="primary" onClick={requestAccounts}>{`Connect to MetaMask >`}</LukyButton>
      ) : (
        <a
          href="https://metamask.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="border-[2px] border-primary text-sm leading-7 font-light py-2 px-6 hover:bg-white hover:text-black hover:border-white"
        >{`Install MetaMask >`}</a>
      )}
    </div>
  );
};
