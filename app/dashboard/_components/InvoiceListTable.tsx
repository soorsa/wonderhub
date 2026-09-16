import {
  ChevronRight,
  Globe,
  Inbox,
  Lock,
  Server,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<LineItem["type"], React.ElementType> = {
  domain: Globe,
  hosting: Server,
  ssl: ShieldCheck,
  addon: Lock,
};

const statusStyles: Record<InvoiceSummary["status"], string> = {
  paid: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  overdue: "bg-red-100 text-red-700",
};

const currency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n
  );

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function InvoiceListTable({
  invoices,
}: {
  invoices: InvoiceSummary[];
}) {
  if (invoices.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl py-16 text-center">
        <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <p className="font-semibold text-slate-700">No invoices found</p>
        <p className="text-sm text-slate-500 mt-1">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      {/* desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200 bg-slate-50/50">
              <th className="py-3 px-4">Invoice</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Services</th>
              <th className="py-3 px-4">Issued</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Amount</th>
              <th className="py-3 px-2"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr
                key={inv.id}
                className="border-b border-slate-100 last:border-none hover:bg-slate-50/70 transition"
              >
                <td className="py-4 px-4">
                  <Link
                    href={`/dashboard/invoices/${inv.id}`}
                    className="font-semibold text-slate-900 hover:text-blue-600"
                  >
                    #{inv.id}
                  </Link>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Due {formatDate(inv.dueDate)}
                  </p>
                </td>
                <td className="py-4 px-4">
                  <p className="font-medium text-slate-800">
                    {inv.customerName}
                  </p>
                  <p className="text-xs text-slate-500">{inv.customerEmail}</p>
                </td>
                <td className="py-4 px-4">
                  <div className="flex -space-x-1.5">
                    {inv.serviceTypes.map((t) => {
                      const Icon = iconMap[t];
                      return (
                        <span
                          key={t}
                          className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-white"
                          title={t}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="py-4 px-4 text-slate-600">
                  {formatDate(inv.issueDate)}
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
                      statusStyles[inv.status]
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right font-bold text-slate-900">
                  {currency(inv.total)}
                </td>
                <td className="py-4 px-2 text-right">
                  <Link
                    href={`/invoice/${inv.id}`}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                    aria-label={`View invoice ${inv.id}`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* mobile cards */}
      <ul className="md:hidden divide-y divide-slate-100">
        {invoices.map((inv) => (
          <li key={inv.id}>
            <Link
              href={`/invoice/${inv.id}`}
              className="block p-4 hover:bg-slate-50 transition"
            >
              <div className="flex justify-between items-start gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 truncate">
                    #{inv.id}
                  </p>
                  <p className="text-sm text-slate-600 truncate">
                    {inv.customerName}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Issued {formatDate(inv.issueDate)} · Due{" "}
                    {formatDate(inv.dueDate)}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold">{currency(inv.total)}</p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                      statusStyles[inv.status]
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
