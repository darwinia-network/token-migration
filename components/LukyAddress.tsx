import { toShortAddress } from "../utils";

export const LukyAddress = ({ value }: { value: string }) => (
  <div className="py-px px-3 bg-black">
    <span className="text-sm leading-7 font-light">{toShortAddress(value)}</span>
  </div>
);
