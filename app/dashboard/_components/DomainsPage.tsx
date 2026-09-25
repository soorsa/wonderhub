import DomainListTable from "@/app/dashboard/_components/DomainListTable";
import MetricCard from "@/app/dashboard/_components/MetricCard";
import { Globe, ReceiptText } from "lucide-react";

const DomainsPage = () => {
  const metrics = [
    {
      title: "Active Domains",
      desc: "Active Domains",
      icon: Globe,
      value: 2,
    },
    {
      title: "Expiring Domains",
      desc: "Expiring Domains",
      icon: Globe,
      value: 1,
    },
    {
      title: "Unpaid Invoice",
      desc: "Pay for unpaid invoice for expiring web services",
      icon: ReceiptText,
      value: 1,
      href: "/dashboard/invoices",
    },
  ];

  return (
    <div>
      <div className="py-5 flex justify-between items-start">
        <div className="">
          <h3 className="text-3xl font-extrabold">Manage Domains</h3>
          <div className="">Here are your domains, manage your domains.</div>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-2">
        {metrics.map((item, i) => (
          <MetricCard
            key={i}
            title={item.title}
            desc={item.desc}
            icon={<item.icon />}
            value={item.value}
            href={item.href}
          />
        ))}
      </div>
      <div className="">
        <DomainListTable />
      </div>
    </div>
  );
};

export default DomainsPage;
