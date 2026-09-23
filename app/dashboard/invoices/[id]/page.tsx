import InvoiceHeader from "@/app/dashboard/_components/InvoiceHeader";
import InvoiceMeta from "@/app/dashboard/_components/InvoiceMeta";
import InvoiceTable from "@/app/dashboard/_components/InvoiceTable";
import InvoiceTotals from "@/app/dashboard/_components/InvoiceTotals";
import { INVOICES } from "@/data/constants";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default async function InvoicePage({ params }: PageProps) {
  const { id } = await params;
  const invoice = await INVOICES.find((inv) => inv.id === id);
  console.log("id", id);
  if (!invoice) notFound();

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-sm overflow-hidden">
        <InvoiceHeader invoiceId={invoice.id} />
        <div className="p-6 md:p-10 space-y-8">
          <InvoiceMeta invoice={invoice} />
          <InvoiceTable items={invoice.items} />
          <InvoiceTotals invoice={invoice} />
        </div>
      </div>
    </div>
  );
}
