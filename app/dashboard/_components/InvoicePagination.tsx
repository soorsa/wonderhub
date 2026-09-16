import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
  page: number;
  totalPages: number;
  search: string;
  status: string;
  sort: string;
}

export default function InvoicePagination({
  page,
  totalPages,
  search,
  status,
  sort,
}: Props) {
  const buildHref = (p: number) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status && status !== "all") params.set("status", status);
    if (sort && sort !== "date_desc") params.set("sort", sort);
    params.set("page", String(p));
    return `/dashboard/invoices?${params.toString()}`;
  };

  const pages = getPageRange(page, totalPages);

  return (
    <nav
      className="flex items-center justify-center gap-1.5"
      aria-label="Pagination"
    >
      <PageLink
        href={buildHref(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </PageLink>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`gap-${i}`} className="px-2 text-slate-400 select-none">
            …
          </span>
        ) : (
          <PageLink key={p} href={buildHref(p as number)} active={p === page}>
            {p}
          </PageLink>
        )
      )}

      <PageLink
        href={buildHref(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </PageLink>
    </nav>
  );
}

function PageLink({
  href,
  children,
  active,
  disabled,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
} & React.AriaAttributes) {
  const base =
    "inline-flex items-center justify-center min-w-[36px] h-9 px-3 rounded-lg text-sm font-semibold transition";
  const styles = active
    ? "bg-slate-900 text-white"
    : disabled
    ? "text-slate-300 pointer-events-none"
    : "text-slate-600 hover:bg-slate-100";

  if (disabled) {
    return <span className={`${base} ${styles}`}>{children}</span>;
  }
  return (
    <Link href={href} className={`${base} ${styles}`} {...rest}>
      {children}
    </Link>
  );
}

function getPageRange(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  if (left > 2) pages.push("...");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("...");
  pages.push(total);

  return pages;
}
