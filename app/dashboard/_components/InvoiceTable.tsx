"use client";

import { Globe, Lock, Server, ShieldCheck } from "lucide-react";

const iconMap = {
  domain: Globe,
  hosting: Server,
  ssl: ShieldCheck,
  addon: Lock,
};

const currency = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
    n
  );

export default function InvoiceTable({ items }: { items: LineItem[] }) {
  return (
    <div className="w-full">
      {/* Desktop / tablet: table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-500">
              <th className="py-3 pr-3">Service</th>
              <th className="px-3 py-3 text-center">Qty</th>
              <th className="px-3 py-3 text-right">Unit price</th>
              <th className="py-3 pl-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const Icon = iconMap[item.type];
              return (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 last:border-none"
                >
                  <td className="py-4 pr-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold">{item.name}</p>
                        <p className="text-xs text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-center">{item.quantity}</td>
                  <td className="px-3 py-4 text-right">
                    {currency(item.unitPrice)}
                  </td>
                  <td className="py-4 pl-3 text-right font-semibold">
                    {currency(item.quantity * item.unitPrice)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards */}
      <div className="space-y-3 md:hidden">
        {items.map((item) => {
          const Icon = iconMap[item.type];
          return (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 p-4"
            >
              {/* Header: icon + name/description */}
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold leading-tight">{item.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Meta rows */}
              <dl className="mt-3 space-y-1.5 border-t border-slate-100 pt-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500">Quantity</dt>
                  <dd>{item.quantity}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500">Unit price</dt>
                  <dd>{currency(item.unitPrice)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                  <dt className="text-slate-500">Amount</dt>
                  <dd className="font-semibold">
                    {currency(item.quantity * item.unitPrice)}
                  </dd>
                </div>
              </dl>
            </div>
          );
        })}
      </div>
    </div>
  );
}
