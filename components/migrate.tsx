import CoonectToMetaMask from "./connect-metamask";
import Button from "./button";
import ChainSlector from "./chain-selector";
import Address from "./address";
import MigrationSelector from "./migration-selector";

import { useApi } from "../hooks/api";

export default () => {
  const { accounts, provider, migration, setAccounts } = useApi();

  return (
    <div className="border-[2px] border-primary h-full">
      <div className="bg-primary h-16 flex justify-between items-center px-4">
        <span className="text-xl font-bold">Migrate Now</span>

        {accounts?.length && provider ? (
          <div className="flex items-center space-x-2">
            <ChainSlector />
            <Address value={accounts[0]} />
          </div>
        ) : null}
      </div>

      {accounts?.length && provider ? (
        <div className={`pt-4 px-4 relative ${migration ? "" : "opacity-50"}`} style={{ height: "calc(100% - 4rem)" }}>
          <MigrationSelector />

          <div className="absolute bottom-5 left-0 w-full px-4">
            <Button className="w-full">Approve</Button>
          </div>
        </div>
      ) : (
        <CoonectToMetaMask
          style={{ height: "calc(100% - 4rem)" }}
          onConnect={({ accounts }) => {
            setAccounts(accounts);
          }}
        />
      )}
    </div>
  );
};
