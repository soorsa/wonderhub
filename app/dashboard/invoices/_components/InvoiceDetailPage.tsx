"use client";
import InvoiceHeader from "@/app/dashboard/_components/InvoiceHeader";
import InvoiceMeta from "@/app/dashboard/_components/InvoiceMeta";
import InvoiceTable from "@/app/dashboard/_components/InvoiceTable";
import InvoiceTotals from "@/app/dashboard/_components/InvoiceTotals";
import { useGetInvoice } from "@/hooks/useQuery";
import { useParams } from "next/navigation";

const InvoiceDetailPage = () => {
  const { id } = useParams();
  const invoice = useGetInvoice(String(id));
  console.log("id", id);
  //   if (!invoice) notFound();
  if (!invoice) return <div>No Invoice</div>;

  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-sm overflow-hidden">
      <InvoiceHeader invoiceId={invoice.id} />
      <div className="p-6 md:p-10 space-y-8">
        <InvoiceMeta invoice={invoice} />
        <InvoiceTable items={invoice.items} />
        <InvoiceTotals invoice={invoice} />
      </div>
    </div>
  );
};

export default InvoiceDetailPage;
