"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface Props {
  search: string;
  status: string;
  sort: string;
}

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "overdue", label: "Overdue" },
];

const SORT_OPTIONS = [
  { value: "date_desc", label: "Newest first" },
  { value: "date_asc", label: "Oldest first" },
  { value: "amount_desc", label: "Highest amount" },
  { value: "amount_asc", label: "Lowest amount" },
];

export default function InvoiceFilters({ search, status, sort }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(search);

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      if (query === search) return;
      update({ search: query || undefined, page: undefined });
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function update(patch: Record<string, string | undefined>) {
    const next = new URLSearchParams(params.toString());
    Object.entries(patch).forEach(([k, v]) => {
      if (v === undefined || v === "" || v === "all") next.delete(k);
      else next.set(k, v);
    });
    startTransition(() => {
      router.push(`/invoices?${next.toString()}`);
    });
  }

  const hasFilters = search || (status && status !== "all");

  return (
    <div
      className={`bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap gap-3 items-center transition ${
        isPending ? "opacity-60" : ""
      }`}
    >
      {/* search */}
      <div className="relative flex-1 min-w-[220px]">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by ID, name or email…"
          className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label="Clear"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* status */}
      <select
        value={status}
        onChange={(e) => update({ status: e.target.value, page: undefined })}
        className="py-2.5 px-3 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
      >
        {STATUS_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {/* sort */}
      <select
        value={sort}
        onChange={(e) => update({ sort: e.target.value, page: undefined })}
        className="py-2.5 px-3 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {/* reset */}
      {hasFilters && (
        <button
          onClick={() =>
            update({ search: undefined, status: undefined, page: undefined })
          }
          className="text-sm text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 px-3 py-2"
        >
          <X className="w-3.5 h-3.5" /> Reset
        </button>
      )}
    </div>
  );
}
