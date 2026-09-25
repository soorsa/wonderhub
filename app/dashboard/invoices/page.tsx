// import InvoiceListTable from "@/app/dashboard/_components/InvoiceListTable";
// import { INVOICES } from "@/data/constants";
// import { FileText, Plus } from "lucide-react";

import InvoiceDetailPage from "@/app/dashboard/invoices/_components/InvoiceDetailPage";

export default async function InvoicesPage() {
  return (
    <InvoiceDetailPage />
    // <main className="min-h-screen">
    //   <div className="max-w-6xl mx-auto space-y-6">
    //     {/* header */}
    //     <div className="flex flex-wrap items-center justify-between gap-4">
    //       <div>
    //         <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
    //           <FileText className="w-7 h-7 text-blue-600" />
    //           Invoices
    //         </h1>
    //         <p className="text-slate-500 mt-1 text-sm">
    //           {INVOICES.length} invoice{INVOICES.length !== 1 ? "s" : ""} found
    //         </p>
    //       </div>
    //       <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-slate-800 transition shadow-lg shadow-slate-900/10">
    //         <Plus className="w-4 h-4 text-blue-400" />
    //         New invoice
    //       </div>
    //     </div>

    //     {/* table */}
    //     <InvoiceListTable invoices={INVOICES} />
    //   </div>
    // </main>
  );
}
