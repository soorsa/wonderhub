import { Globe, Lock, Server, ShieldCheck } from "lucide-react";

const iconMap = {
  domain: Globe,
  hosting: Server,
  ssl: ShieldCheck,
  addon: Lock,
};

const currency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n
  );

export default function InvoiceTable({ items }: { items: LineItem[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
            <th className="py-3 pr-3">Service</th>
            <th className="py-3 px-3 text-center">Qty</th>
            <th className="py-3 px-3 text-right">Unit price</th>
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
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-xs text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-3 text-center">{item.quantity}</td>
                <td className="py-4 px-3 text-right">
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
  );
}
