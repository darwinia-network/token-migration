import { toShortAddress } from "../utils";

const Address = ({ value }: { value: string }) => (
  <div className="py-px px-3 bg-black">
    <span className="text-sm leading-7 font-light">{toShortAddress(value)}</span>
  </div>
);

export default Address;
