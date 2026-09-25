"use client";
import Button from "@/components/General/Button";
import { usePaystackPayment } from "@/hooks/payments/usePayment";
import Cookies from "js-cookie";
import { CreditCard, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const currency = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
    n
  );

export default function InvoiceTotals({ invoice }: { invoice: Invoice }) {
  const router = useRouter();
  const paystack = usePaystackPayment();
  const subtotal = invoice.items.reduce(
    (s, i) => s + i.quantity * i.unitPrice,
    0
  );
  const taxable = subtotal;
  const tax = taxable * invoice.taxRate;
  const total = taxable + tax;
  const handlePaystackPayment = () => {
    paystack({
      email: invoice.customer.email || "wonderhub.dev@gmail.com",
      amount: total,
      reference: invoice.id,
      // phoneNumber: invoice.customer.phone || "",
      onSuccess() {
        toast.success("Payment successfull");
        Cookies.set("has_paid", "yes");
        router.refresh();
      },
      onClose() {
        toast.error("Payment canceled");
      },
    });
  };
  return (
    <section className="space-y-8">
      <div className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-3 bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm text-slate-600">
          <p className="font-semibold text-slate-800 mb-1">Notes</p>
          <p>
            Thank you for choosing Wonderhub. All services are active. Support:
            wonderhub.dev@gmail.com
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
            label={`VAT (${(invoice.taxRate * 100).toFixed(2)}%)`}
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

      <div className="flex justify-end items-center gap-4 pt-4 border-t border-slate-200">
        <div className="space-y-2 w-full md:w-1/3">
          <Button
            onClick={handlePaystackPayment}
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
