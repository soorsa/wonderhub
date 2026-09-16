import { HostingRows } from "@/app/dashboard/_components/Row";
import Button from "@/components/General/Button";
import { Hostings } from "@/data/constants";
import { RefreshCcw } from "lucide-react";

const HostingListTable = () => {
  return (
    <div className="mt-6 overflow-hidden rounded-md border border-slate-200">
      <div className="grid grid-cols-[2fr_1fr_1fr] bg-slate-100 px-4 py-3 font-bold text-slate-700">
        <span>Hosting</span>
        <span>Duration</span>
        <span>Expires</span>
      </div>
      {Hostings.map((item, i) => (
        <>
          <HostingRows
            key={i}
            className="grid-cols-[2fr_1fr_1fr]"
            hosting={item}
          />
          <div className="flex justify-end px-4 pb-1">
            <Button
              label="Renew Hosting"
              icon={<RefreshCcw size={14} />}
              className="border border-gray-400 hover:bg-primary/10 w-fit! px-4 text-xs rounded-sm"
            />
          </div>
        </>
      ))}
    </div>
  );
};

export default HostingListTable;
