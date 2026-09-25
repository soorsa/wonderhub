import { INVOICES } from "@/data/constants";

export const useGetInvoice = (id: string) => {
  const invoice = INVOICES.find((inv) => inv.id === id);
  return invoice;
};
