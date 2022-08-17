import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BigNumber } from "ethers";
import { Subscription, from } from "rxjs";

import { ConnectMetamask } from "./ConnectMetamask";
import { LukyButton } from "./LukyButton";
import { ChainSlector } from "./ChainSelector";
import { LukyAddress } from "./LukyAddress";
import { MigratorSelector } from "./MigratorSelector";

import { approveKton, migrateKton, allowanceKton, lukytoast } from "../utils";
import { useApi } from "../hooks";
import { MIGRATORS_CONF, TOKENS_CONF, CHAINS_CONF } from "../config";
import { ChainID } from "../types";

const toastTxResult = ({
  type,
  error,
  txHash,
  explorers,
}: {
  error?: Error;
  txHash?: string;
  explorers?: string[];
  type?: "failed" | "confirmed" | "succeeded";
}) => {
  if (error) {
    lukytoast.error({
      title: "Transction failed",
      content: <p className="text-left break-words">{error.message}</p>,
    });
  } else if (txHash && explorers?.length && type) {
    lukytoast.success({
      title: `Transction ${type}`,
      content: (
        <p className="text-left break-words">
          <span>Transcton hash: </span>
          <a
            href={`${explorers[0]}/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
          >
            {txHash}
          </a>
        </p>
      ),
    });
  }
};

export const MigratorCard = () => {
  const { provider, balance, accounts, currentChain, migratorIndex, refreshBalance } = useApi();
  const [busy, setBusy] = useState(false);
  const [needApprove, setNeedApprove] = useState(false);

  const isSupported = useMemo(() => currentChain !== null && CHAINS_CONF[currentChain as ChainID], [currentChain]);

  const handleApprove = useCallback(async () => {
    if (migratorIndex !== null && currentChain && provider) {
      const chainConfig = CHAINS_CONF[currentChain as ChainID];
      const migrator = MIGRATORS_CONF[currentChain as ChainID][migratorIndex];

      setBusy(true);
      await approveKton(provider, TOKENS_CONF[migrator.from].options.address, migrator.contract, {
        onError: (error) => {
          toastTxResult({ error });
          setBusy(false);
        },
        onResponse(txHash) {
          toastTxResult({
            txHash,
            type: "confirmed",
            explorers: chainConfig.blockExplorerUrls,
          });
        },
        onSuccess(txHash) {
          toastTxResult({
            txHash,
            type: "succeeded",
            explorers: chainConfig.blockExplorerUrls,
          });

          setNeedApprove(false);
          setBusy(false);
        },
      });
    }
  }, [migratorIndex, currentChain, provider]);

  const handleMigrate = useCallback(async () => {
    if (migratorIndex !== null && currentChain && provider) {
      const chainConfig = CHAINS_CONF[currentChain as ChainID];
      const migrator = MIGRATORS_CONF[currentChain as ChainID][migratorIndex];

      setBusy(true);
      await migrateKton(provider, migrator.contract, {
        onError: (error) => {
          toastTxResult({ error });
          setBusy(false);
        },
        onResponse(txHash) {
          toastTxResult({
            txHash,
            type: "confirmed",
            explorers: chainConfig.blockExplorerUrls,
          });
        },
        onSuccess(txHash) {
          toastTxResult({
            txHash,
            type: "succeeded",
            explorers: chainConfig.blockExplorerUrls,
          });
          refreshBalance();
          setBusy(false);
        },
      });
    }
  }, [migratorIndex, currentChain, provider, refreshBalance]);

  useEffect(() => {
    let sub$$: Subscription;

    if (migratorIndex !== null && currentChain && provider && accounts) {
      const migrator = MIGRATORS_CONF[currentChain as ChainID][migratorIndex];

      sub$$ = from(
        allowanceKton(provider, TOKENS_CONF[migrator.from].options.address, accounts[0], migrator.contract)
      ).subscribe((amount) => {
        if (balance?.oldToken && amount.gt(balance.oldToken)) {
          setNeedApprove(false);
        } else {
          setNeedApprove(true);
        }
      });
    } else {
      setNeedApprove(true);
    }

    return () => {
      if (sub$$) {
        sub$$.unsubscribe();
      }
    };
  }, [migratorIndex, currentChain, provider, accounts, balance?.oldToken]);

  return (
    <div className="border-[2px] border-primary h-full">
      <div className="bg-primary h-16 flex justify-between items-center px-4">
        <span className="text-xl font-bold">Migrate Now</span>

        {accounts?.length && provider ? (
          <div className="flex items-center space-x-2">
            <ChainSlector />
            <LukyAddress value={accounts[0]} />
          </div>
        ) : null}
      </div>

      {accounts?.length && provider ? (
        <div
          className={`pt-4 px-4 relative ${isSupported ? "" : "opacity-50"}`}
          style={{ height: "calc(100% - 4rem)" }}
        >
          <MigratorSelector />

          {isSupported ? (
            <div className="absolute bottom-5 left-0 w-full px-4">
              {needApprove ? (
                <LukyButton
                  className="w-full"
                  onClick={handleApprove}
                  loading={busy}
                  disable={!balance?.oldToken?.gt(BigNumber.from(0))}
                >
                  Approve
                </LukyButton>
              ) : (
                <LukyButton
                  className="w-full"
                  type="primary"
                  loading={busy}
                  disable={!balance?.oldToken?.gt(BigNumber.from(0))}
                  onClick={handleMigrate}
                >
                  Migrate Token
                </LukyButton>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center" style={{ height: "calc(100% - 4rem)" }}>
              <p>This Chain Is Not Supported</p>
            </div>
          )}
        </div>
      ) : (
        <ConnectMetamask style={{ height: "calc(100% - 4rem)" }} />
      )}
    </div>
  );
};
