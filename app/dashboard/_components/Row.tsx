import { Hostings } from "@/data/constants";
import { formatDate } from "@/lib/utils";
import { cn } from "cn";
import { Globe, Server } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

export default function Rows({
  rowContent,
  className,
  icon,
}: {
  rowContent: string[];
  className: string;
  icon: ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-[1fr_2fr_1fr] border-t border-slate-200 px-4 py-3 text-xs text-slate-600",
        className
      )}
    >
      {rowContent.map((text, i) => (
        <span
          key={i}
          className={cn(
            "text-slate-800",
            i === 0 && "font-medium flex items-center gap-1"
          )}
        >
          {i == 0 && icon && icon}
          {text}
        </span>
      ))}
    </div>
  );
}
interface HostingRowsProps {
  hosting: (typeof Hostings)[0];
  className?: string;
}
export const HostingRows: React.FC<HostingRowsProps> = ({
  hosting,
  className,
}) => {
  return (
    <div className="px-4 py-3  border-t border-slate-200">
      <div
        className={cn(
          "grid grid-cols-[1fr_2fr_1fr] pb-1 text-xs text-slate-600",
          className
        )}
      >
        <div
          className={cn("font-medium text-slate-800 flex items-center gap-1")}
        >
          <Server size={14} />
          {hosting.type}
        </div>
        <span>{hosting.duration}</span>
        <span>{formatDate(hosting.expires)}</span>
      </div>
      <div className="border-l border-b ml-10 text-xs space-y-1.5 pt-3 pb-1 rounded-bl-sm">
        {hosting.domains.map((item, i) => (
          <Link
            href={item.domain}
            className="flex items-center gap-1 ml-2"
            key={i}
          >
            <Globe size={14} className="text-blue-500" />
            <span>{item.domain}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
