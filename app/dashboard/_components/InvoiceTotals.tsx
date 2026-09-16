import Button from "@/components/General/Button";
import { CreditCard, Download, Lock, Printer } from "lucide-react";

const currency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n
  );

export default function InvoiceTotals({ invoice }: { invoice: Invoice }) {
  const subtotal = invoice.items.reduce(
    (s, i) => s + i.quantity * i.unitPrice,
    0
  );
  const taxable = subtotal - invoice.discountAmount;
  const tax = taxable * invoice.taxRate;
  const total = taxable + tax;

  return (
    <section className="space-y-8">
      <div className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-3 bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm text-slate-600">
          <p className="font-semibold text-slate-800 mb-1">Notes</p>
          <p>
            Thank you for choosing HostDomain. All services are active. Renewal
            reminders will be sent 30 days before expiry. Support:
            help.hostdomain.com
          </p>
        </div>

        <div className="md:col-span-2 space-y-1">
          <Row label="Subtotal" value={currency(subtotal)} />
          {invoice.discountCode && (
            <Row
              label={`Discount (${invoice.discountCode})`}
              value={`– ${currency(invoice.discountAmount)}`}
              accent="text-emerald-600"
            />
          )}
          <Row
            label={`Tax (${(invoice.taxRate * 100).toFixed(2)}%)`}
            value={currency(tax)}
          />
          <div className="flex justify-between items-center pt-4 mt-2 border-t-2 border-slate-200">
            <span className="font-extrabold text-lg">Total due</span>
            <span className="font-extrabold text-xl text-blue-600">
              {currency(total)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-slate-200">
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-slate-800 transition">
            <Download className="w-4 h-4 text-blue-400" /> Download PDF
          </button>
          <button className="inline-flex items-center gap-2 border border-slate-300 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-slate-50 transition">
            <Printer className="w-4 h-4 text-blue-500" /> Print
          </button>
        </div>
        <div className="space-y-2">
          <Button
            label={`Pay with ${invoice.paymentMethod.brand}`}
            className="bg-primary! text-white font-semibold"
            icon={<CreditCard className="w-8 h-8" />}
          />
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-blue-500" /> Secure payment ·
            Wonderhub Inc.
          </p>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  accent = "",
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="flex justify-between py-2 border-b border-dashed border-slate-200 text-sm">
      <span className="text-slate-600">{label}</span>
      <span className={`font-semibold ${accent}`}>{value}</span>
    </div>
  );
}
