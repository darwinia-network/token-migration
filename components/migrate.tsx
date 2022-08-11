import { useCallback } from "react";
import { Contract, utils } from "ethers";

import CoonectToMetaMask from "./connect-metamask";
import Button from "./button";
import ChainSlector from "./chain-selector";
import Address from "./address";
import MigrationSelector from "./migration-selector";

import { useApi } from "../hooks/api";
import ktonAbi from "../abi/ktonABI.json";
import migratorAbi from "../abi/migratorABI.json";

const Migrate = () => {
  const { accounts, provider, migration, setAccounts } = useApi();

  const handleApprove = useCallback(async () => {
    if (provider && accounts?.length) {
      // const contract = new Contract('0x8809f9b3ACEF1dA309f49b5Ab97A4C0faA64E6Ae', ktonAbi, provider.getSigner());

      // const balance = await contract.balanceOf(accounts[0]);
      // console.log(utils.formatEther(balance));

      // const result = await contract.approve('0xE3F90f6Fe7c70b1F8cBEbc3477048d4F32E61f07', utils.parseEther('0.9').toHexString());
      // console.log(result);

      // const amount = await contract.allowance(accounts[0], '0xE3F90f6Fe7c70b1F8cBEbc3477048d4F32E61f07');
      // console.log(utils.formatEther(amount));

      // migrator contract
      const contract = new Contract("0xE3F90f6Fe7c70b1F8cBEbc3477048d4F32E61f07", migratorAbi, provider.getSigner());

      // const oldKton = await contract.old_wckton();
      // const newKton = await contract.new_wckton();
      // console.log(oldKton, newKton);

      const result = await contract.migrate();
      console.log(result);
    }
  }, [provider, accounts]);

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
            <Button className="w-full" onClick={handleApprove}>
              Approve
            </Button>
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

export default Migrate;
