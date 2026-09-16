import { cn } from "cn";
import Link from "next/link";
import React, { ReactNode } from "react";
interface Prop {
  title: string;
  desc?: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
  href?: string;
}
const MetricCard: React.FC<Prop> = ({
  title,
  desc,
  icon,
  value,
  href = "#",
  className,
}) => {
  return (
    <Link
      href={href}
      title={title}
      className={cn(
        "border border-gray-200 rounded-md flex items-center gap-4 p-5 hover:bg-primary hover:text-white",
        className
      )}
    >
      <div className="text-5xl font-black">{value}</div>
      <div className="flex-1">
        <div className={cn("flex items-center gap-1")}>
          {icon && icon}
          <div className="font-semibold line-clamp-1">{title}</div>
        </div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </Link>
  );
};

export default MetricCard;
