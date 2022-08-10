import Image from "next/image";

export default ({ classname }: { classname?: string }) => (
  <div className={`flex flex-col items-start justify-start ${classname}`}>
    <Image src="/images/migration.svg" width={100} height={100} />
    <h2 className="text-5xl font-medium backdrop-blur-2xl my-5">Token Migration</h2>
    <p className="text-[##C6C6C6] text-sm leading-8 tracking-wide font-light mt-1 mb-2">{`To improve the user experience of transferring CKTON to smart chain, we've upgraded the solution in the Darwinia Runtime Upgrade. Rather than the original standard of Wrapped Contract, we've changed it into ERC-20. The old token WCKTON has been renamed to WCKTON(Classic), and the new one uses the symbol CKTON.`}</p>
    <p className="text-[##C6C6C6] text-sm leading-8 tracking-wide font-light mt-1 mb-2">{`n addition, with the upgrade of the substrate<>substrate bridge protocol by Helix, the old bridge will be no longer supported and the old mapping token xRING will not be advised. The old token xRING has been renamed to xRING(Classic), and the new one uses the symbol xWRING.`}</p>
    <p className="text-[##C6C6C6] text-sm leading-8 tracking-wide font-light mt-1 mb-2">{`You can use the app on the left to migrate the two tokens.`}</p>
  </div>
);
