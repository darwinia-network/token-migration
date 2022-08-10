export const toShortAddress = (address: string) => {
  if (address.length > 12) {
    return `${address.slice(0, 6)} ... ${address.slice(-4)}`;
  }

  return address;
};
