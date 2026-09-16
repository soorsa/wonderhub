/* -------------------------------------------------------------------------- */
/*  Single source of truth for ALL invoices.                                  */
/*  Both `getInvoice` (detail) and `listInvoices` (list) read from here.      */
/*  In production, replace this block with a DB query.                        */
/* -------------------------------------------------------------------------- */

const CUSTOMERS = [
  {
    name: "Daniel Obinna",
    email: "alaba.market@gmail.com",
    phone: "+1 (415) 555-0198",
    address: "22 Imala St, Idimu, Lagos",
  },
];

const SERVICE_POOL: Invoice["items"] = [
  {
    id: "1",
    name: "Domain Registration",
    description: ".com · 1 year",
    type: "domain",
    quantity: 1,
    unitPrice: 35000.0,
  },
  {
    id: "2",
    name: "Cloud Hosting – Business",
    description: "4 vCPU · 16GB RAM · 1 year",
    type: "hosting",
    quantity: 1,
    unitPrice: 73000.0,
  },
  {
    id: "3",
    name: "Wildcard SSL Certificate",
    description: "*.example.com · 1 year",
    type: "ssl",
    quantity: 1,
    unitPrice: 79.0,
  },
  {
    id: "4",
    name: "Domain Privacy Protection",
    description: "WHOIS privacy · 1 year",
    type: "addon",
    quantity: 1,
    unitPrice: 2200.0,
  },
  {
    id: "5",
    name: "Shared Hosting (cPanel)",
    description: "2 vCPU · 4GB RAM · 1 year",
    type: "hosting",
    quantity: 1,
    unitPrice: 73000.0,
  },
];

const STATUSES: Invoice["status"][] = ["paid", "pending", "overdue"];

/**
 * Deterministic generator so IDs, dates, and totals are stable across
 * server renders, client navigations, and the detail page lookup.
 */
const MOCK_INVOICES: Invoice[] = Array.from({ length: 3 }, (_, i) => {
  const customer = CUSTOMERS[i % CUSTOMERS.length];
  const status = STATUSES[i % STATUSES.length];

  // Spread dates across 2025 (Jan → Dec), deterministic per index
  const month = (i % 12) + 1;
  const day = (i % 27) + 1;
  const issueDate = `2025-${String(month).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;
  const dueDay = Math.min(day + 14, 28);
  const dueDate = `2025-${String(month).padStart(2, "0")}-${String(
    dueDay
  ).padStart(2, "0")}`;

  // Pick 1–3 services deterministically
  const itemCount = (i % 3) + 1;
  const items = Array.from({ length: itemCount }, (_, k) => {
    const svc = SERVICE_POOL[(i + k) % SERVICE_POOL.length];
    return { ...svc, id: `${i}-${k}` };
  });

  const hasDiscount = i % 3 === 0;
  const discountAmount = hasDiscount ? 20.4 : 0;

  return {
    id: `HD-2025-${String(1000 + i).padStart(4, "0")}`,
    issueDate,
    dueDate,
    status,
    customer,
    paymentMethod: { brand: "Paystack" },
    items,
    discountCode: hasDiscount ? "SAVE10" : undefined,
    discountAmount,
    taxRate: 0.0825,
  };
});

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function computeTotal(inv: Invoice): number {
  const subtotal = inv.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const taxable = subtotal - inv.discountAmount;
  return taxable + taxable * inv.taxRate;
}

function toSummary(inv: Invoice): InvoiceSummary {
  return {
    id: inv.id,
    customerName: inv.customer.name,
    customerEmail: inv.customer.email,
    issueDate: inv.issueDate,
    dueDate: inv.dueDate,
    status: inv.status,
    total: computeTotal(inv),
    itemCount: inv.items.length,
    serviceTypes: [...new Set(inv.items.map((i) => i.type))],
  };
}

/* -------------------------------------------------------------------------- */
/*  Public API                                                                */
/* -------------------------------------------------------------------------- */

/** Used by the invoice DETAIL page: app/invoice/[id]/page.tsx */
export async function getInvoice(id: string): Promise<Invoice | null> {
  return MOCK_INVOICES.find((i) => i.id === id) ?? null;
}

/** Used by the invoice LIST page: app/invoices/page.tsx */
export async function listInvoices(
  params: InvoiceListParams = {}
): Promise<InvoiceListResult> {
  const {
    search = "",
    status = "all",
    sort = "date_desc",
    page = 1,
    pageSize = 8,
  } = params;

  let rows = MOCK_INVOICES.map(toSummary);

  if (search) {
    const q = search.toLowerCase();
    rows = rows.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.customerName.toLowerCase().includes(q) ||
        r.customerEmail.toLowerCase().includes(q)
    );
  }

  if (status !== "all") {
    rows = rows.filter((r) => r.status === status);
  }

  rows.sort((a, b) => {
    switch (sort) {
      case "date_asc":
        return +new Date(a.issueDate) - +new Date(b.issueDate);
      case "amount_desc":
        return b.total - a.total;
      case "amount_asc":
        return a.total - b.total;
      case "date_desc":
      default:
        return +new Date(b.issueDate) - +new Date(a.issueDate);
    }
  });

  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const paged = rows.slice(start, start + pageSize);

  return {
    invoices: paged,
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

/** Convenience: valid IDs (useful for tests / seeding / debugging) */
export function getAllInvoiceIds(): string[] {
  return MOCK_INVOICES.map((i) => i.id);
}
