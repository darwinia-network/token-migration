import { providers, Contract } from "ethers";

export type ErrorCallbackType = ({ error }: { error: unknown }) => void;
export type ResponseCallbackType = ({ response }: { response: providers.TransactionResponse }) => void;
export type SuccessCallbackType = ({ receipt }: { receipt: providers.TransactionReceipt }) => void;

export type CallbackType = {
  errorCallback: ErrorCallbackType;
  responseCallback?: ResponseCallbackType;
  successCallback?: SuccessCallbackType;
};

export const triggerContract = async (
  contract: Contract,
  methodName: string,
  contractArgs: unknown[] = [],
  callback: CallbackType = { errorCallback: () => undefined }
) => {
  const { errorCallback, responseCallback, successCallback } = callback;

  try {
    const response: providers.TransactionResponse = await contract[methodName](...contractArgs);

    if (responseCallback) {
      responseCallback({ response });
    }

    const receipt: providers.TransactionReceipt = await response.wait(2);

    if (receipt.byzantium && receipt.status === 1 && successCallback) {
      successCallback({ receipt });
    }
  } catch (error) {
    console.error("[triggerContract]", error);
    errorCallback({ error });
  }
};
