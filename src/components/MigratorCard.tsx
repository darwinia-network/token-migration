import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BigNumber } from "ethers";
import { Subscription, from } from "rxjs";
import Fade from "react-reveal/Fade";

import { ConnectMetamask } from "./ConnectMetamask";
import { LukyButton } from "./LukyButton";
import { ChainSlector } from "./ChainSelector";
import { LukyAddress } from "./LukyAddress";
import { MigratorSelector } from "./MigratorSelector";

import { approveToken, migrateToken, allowanceToken, lukytoast } from "../utils";
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
      title: "Transaction failed",
      content: <p className="text-left break-words text-secondary">{error.message}</p>,
    });
  } else if (txHash && explorers?.length && type) {
    lukytoast.success({
      title: `Transaction ${type}`,
      content: (
        <p className="text-left break-words">
          <span className="text-secondary">Transaction hash: </span>
          <a
            href={`${explorers[0]}/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-secondary"
          >
            {txHash}
          </a>
        </p>
      ),
    });
  }
};

export const MigratorCard = () => {
  const { provider, assets, accounts, currentChain, migratorIndex, refreshBalance } = useApi();
  const [busy, setBusy] = useState(false);
  const [needApprove, setNeedApprove] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const migrator = useMemo(() => {
    if (migratorIndex !== null && currentChain) {
      return MIGRATORS_CONF[currentChain as ChainID][migratorIndex];
    }
    return null;
  }, [migratorIndex, currentChain]);

  const isSupported = useMemo(() => currentChain !== null && CHAINS_CONF[currentChain as ChainID], [currentChain]);

  const handleApprove = useCallback(async () => {
    if (migrator && provider) {
      const chainConfig = CHAINS_CONF[currentChain as ChainID];

      setBusy(true);
      await approveToken(provider, TOKENS_CONF[migrator.from].options.address, migrator.contract, {
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
  }, [migrator, provider]);

  const handleMigrate = useCallback(async () => {
    if (migrator && provider) {
      const chainConfig = CHAINS_CONF[currentChain as ChainID];

      setBusy(true);
      await migrateToken(provider, migrator.contract, migrator.methodName, {
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
          setRefreshTrigger((prev) => !prev);
          setBusy(false);
        },
      });
    }
  }, [migrator, provider, refreshBalance]);

  useEffect(() => {
    let sub$$: Subscription;

    if (migrator && provider && accounts) {
      sub$$ = from(
        allowanceToken(provider, TOKENS_CONF[migrator.from].options.address, accounts[0], migrator.contract)
      ).subscribe((amount) => {
        if (assets?.legacy?.balance && amount.gt(assets.legacy.balance)) {
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
  }, [migrator, provider, accounts, assets?.legacy?.balance]);

  useEffect(() => {
    setRefreshTrigger((prev) => !prev);
  }, [accounts]);

  return (
    <Fade bottom>
      <div className="w-[580px] border-[2px] border-primary">
        <div className="bg-primary h-16 flex justify-between items-center px-4">
          <span className="title text-xl font-bold">Migrate Now</span>

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
            <MigratorSelector refreshTrigger={refreshTrigger} />

            {isSupported ? (
              <div className="absolute bottom-5 left-0 w-full px-4">
                {needApprove ? (
                  <LukyButton
                    className="w-full"
                    onClick={handleApprove}
                    loading={busy}
                    disable={!assets?.legacy?.balance?.gt(BigNumber.from(0))}
                  >
                    Approve
                  </LukyButton>
                ) : (
                  <LukyButton
                    className="w-full"
                    type="primary"
                    loading={busy}
                    disable={!!migrator?.disable || !assets?.legacy?.balance?.gt(BigNumber.from(0))}
                    onClick={handleMigrate}
                  >
                    Migrate Token
                  </LukyButton>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center" style={{ height: "calc(100% - 4rem)" }}>
                <p className="text-secondary">This Chain Is Not Supported</p>
              </div>
            )}
          </div>
        ) : (
          <ConnectMetamask style={{ height: "calc(100% - 4rem)" }} />
        )}
      </div>
    </Fade>
  );
};
