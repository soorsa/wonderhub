import HostingListTable from "@/app/dashboard/_components/HostingListTable";
import MetricCard from "@/app/dashboard/_components/MetricCard";
import { Globe, ReceiptText, Server } from "lucide-react";

const HostingPage = () => {
  const metrics = [
    {
      title: "Active Domains",
      desc: "Active Domains",
      icon: Globe,
      value: 2,
    },
    {
      title: "Active Hosting",
      desc: "Active Hosting",
      icon: Server,
      value: 1,
    },
    {
      title: "Expiring Hosting",
      desc: "Expiring Hosting",
      icon: Server,
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
          <h3 className="text-3xl font-extrabold">Manage Servers</h3>
          <div className="">
            Here are your hosting plans, manage your servers.
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-4 gap-2">
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
        <HostingListTable />
      </div>
    </div>
  );
};

export default HostingPage;
