import { Calendar, CheckCircle2, User } from "lucide-react";

export default function InvoiceMeta({ invoice }: { invoice: Invoice }) {
  const statusStyles: Record<Invoice["status"], string> = {
    paid: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    overdue: "bg-red-100 text-red-700",
  };

  return (
    <section className="space-y-6">
      {/* meta grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 rounded-2xl border border-slate-100 p-5">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
            Issue date
          </p>
          <p className="font-bold mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" /> {invoice.issueDate}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
            Due date
          </p>
          <p className="font-bold mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" /> {invoice.dueDate}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
            Status
          </p>
          <span
            className={`inline-flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full text-xs font-bold ${
              statusStyles[invoice.status]
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {invoice.status.toUpperCase()}
          </span>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
            Payment ID
          </p>
          <p className="font-bold mt-1 text-sm">ch_3PxL9k2eZvKY</p>
        </div>
      </div>

      {/* billing + payment */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3 flex items-center gap-2">
            <User className="w-3.5 h-3.5" /> Billed to
          </h4>
          <p className="font-bold text-lg">{invoice.customer.name}</p>
          <p className="text-sm text-slate-600 mt-1">
            {invoice.customer.email}
          </p>
          <p className="text-sm text-slate-600">{invoice.customer.phone}</p>
          <p className="text-sm text-slate-600">{invoice.customer.address}</p>
        </div>
        {/* <div>
          <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3 flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5" /> Payment method
          </h4>
          <Button
            label={`Pay with ${invoice.paymentMethod.brand}`}
            className="text-lg bg-primary! text-white font-semibold"
            icon={<CreditCard className="w-8 h-8" />}
          />
        </div> */}
      </div>
    </section>
  );
}
