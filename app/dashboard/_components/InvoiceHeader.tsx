import Logo from "@/public/logo.png";
import { FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function InvoiceHeader({
  invoiceId,
  showBadge = true,
}: {
  invoiceId?: string;
  showBadge?: boolean;
}) {
  return (
    <header className="bg-linear-to-br from-primary to-slate-700 text-white px-6 md:px-10 py-6 flex flex-wrap items-center justify-between gap-4">
      <Link href="/invoices" className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-blue-500/40">
          <Image src={Logo} alt="wonderhub" className="w-8 h-8" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-transparent bg-linear-to-r to-pink-300 from-white bg-clip-text">
          wonder
          <span className="font-black">HUB</span>
        </span>
      </Link>
      {showBadge && invoiceId && (
        <div className="flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
          <FileText className="w-4 h-4 text-blue-400" />
          Invoice #{invoiceId}
        </div>
      )}
    </header>
  );
}
