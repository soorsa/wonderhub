import InvoiceListTable from "@/app/dashboard/_components/InvoiceListTable";
import InvoicePagination from "@/app/dashboard/_components/InvoicePagination";
import { listInvoices } from "@/lib/invoice";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";

interface PageProps {
  searchParams: {
    search?: string;
    status?: string;
    sort?: string;
    page?: string;
  };
}

export default async function InvoicesPage({ searchParams }: PageProps) {
  const params: InvoiceListParams = {
    search: searchParams.search ?? "",
    status: (searchParams.status as InvoiceListParams["status"]) ?? "all",
    sort: (searchParams.sort as InvoiceListParams["sort"]) ?? "date_desc",
    page: Number(searchParams.page ?? 1),
    pageSize: 8,
  };

  const result = await listInvoices(params);

  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <FileText className="w-7 h-7 text-blue-600" />
              Invoices
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              {result.total} invoice{result.total !== 1 ? "s" : ""} found
            </p>
          </div>
          <Link
            href="/invoices/new"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-slate-800 transition shadow-lg shadow-slate-900/10"
          >
            <Plus className="w-4 h-4 text-blue-400" />
            New invoice
          </Link>
        </div>

        {/* filters */}
        {/* <InvoiceFilters
          search={params.search!}
          status={params.status!}
          sort={params.sort!}
        /> */}

        {/* table */}
        <InvoiceListTable invoices={result.invoices} />

        {/* pagination */}
        {result.totalPages > 1 && (
          <InvoicePagination
            page={result.page}
            totalPages={result.totalPages}
            search={params.search!}
            status={params.status!}
            sort={params.sort!}
          />
        )}
      </div>
    </main>
  );
}
