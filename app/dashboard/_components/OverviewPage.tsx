/* eslint-disable react/no-unescaped-entities */

import DomainListTable from "@/app/dashboard/_components/DomainListTable";
import HostingListTable from "@/app/dashboard/_components/HostingListTable";
import MetricCard from "@/app/dashboard/_components/MetricCard";
import { Globe, Server } from "lucide-react";

const OverviewPage = () => {
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
      value: 2,
    },
    {
      title: "Expiring Domains",
      desc: "Expiring Domains",
      icon: Globe,
      value: 2,
    },
    {
      title: "Unpaid Invoice",
      desc: "Pay for unpaid invoice for expiring web services",
      icon: Globe,
      value: 2,
    },
  ];
  return (
    <div>
      <div className="py-5 flex justify-between items-start">
        <div className="">
          <h3 className="text-3xl font-extrabold">Good Day, Victoria 👋</h3>
          <div className="">
            Here's what's happening across Sterling Tech today.
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
          />
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4 min-h-[60vh]">
        <DomainListTable />
        <HostingListTable />
      </div>
    </div>
  );
};

export default OverviewPage;
