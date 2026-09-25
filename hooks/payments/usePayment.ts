/* eslint-disable @typescript-eslint/no-explicit-any */
// import PaystackPop from "@paystack/inline-js";
type PaystackProps = {
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  amount: number; // amount in Naira
  reference: string;
  onSuccess: (reference: any) => void;
  onClose: () => void;
};
export const usePaystackPayment = () => {
  const initializePayment = async ({
    email,
    phoneNumber,
    amount,
    onSuccess,
    onClose,
  }: PaystackProps) => {
    const { default: PaystackPop } = await import("@paystack/inline-js");
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_live_588fefa471eec1c09f27fff52aaad203f61e161f", // 🔁 Replace with your Paystack public key
      // key: "pk_test_b9e752c6a78ba66ac52db02d686bedf6ccd3a6ac", // 🔁 Replace with your Paystack public key
      email,
      amount: amount * 100, // convert to kobo
      currency: "NGN",
      // phone: phoneNumber,
      onSuccess: (transaction: any) => {
        onSuccess(transaction);
      },
      onCancel() {
        onClose();
      },
    });

    // paystack?.openIframe();
  };

  return initializePayment;
};
