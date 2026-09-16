import Rows from "@/app/dashboard/_components/Row";
import Button from "@/components/General/Button";
import { formatDate } from "@/lib/utils";
import { Globe, RefreshCcw } from "lucide-react";

const DomainListTable = () => {
  const Domains = [
    {
      domain: "richtecafrica.com",
      protocol: "https",
      secured: true,
      duration: "1 Year",
      expires: "10-16-2026",
    },
    {
      domain: "alaba.market",
      protocol: "https",
      secured: true,
      duration: "1 Year",
      expires: "10-21-2026",
    },
  ];
  return (
    <div className="mt-6 overflow-hidden rounded-md border border-slate-200">
      <div className="grid grid-cols-[2fr_1fr_1fr] bg-slate-100 px-4 py-3 font-bold text-slate-700">
        <span>Domain</span>
        <span>Duration</span>
        <span>Expires</span>
      </div>
      {Domains.map((item, i) => (
        <>
          <Rows
            key={i}
            icon={<Globe size={14} className="text-blue-500" />}
            className="grid-cols-[2fr_1fr_1fr]"
            rowContent={[item.domain, item.duration, formatDate(item.expires)]}
          />
          <div className="flex justify-end px-4 pb-1">
            <Button
              label="Renew Domain"
              icon={<RefreshCcw size={14} />}
              className="border border-gray-400 hover:bg-primary/10 w-fit! px-4 text-xs rounded-sm"
            />
          </div>
        </>
      ))}
    </div>
  );
};

export default DomainListTable;
