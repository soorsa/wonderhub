interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fbq: (...args: any[]) => void;
}

interface Project {
  id: number;
  title: string;
  category: string[];
  year: string;
  image: string;
  description: string;
}

/* -------------------------------------------------------------------------- */
/*  Domain primitives                                                         */
/* -------------------------------------------------------------------------- */

type InvoiceStatus = "paid" | "pending" | "overdue";

type ServiceType = "domain" | "hosting" | "ssl" | "addon";

type PaymentBrand = "Paystack" | "Flutterwave" | "Moniepoint";

/* -------------------------------------------------------------------------- */
/*  Core entities                                                             */
/* -------------------------------------------------------------------------- */

interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface PaymentMethod {
  brand: PaymentBrand;
}

interface LineItem {
  id: string;
  name: string;
  description: string;
  type: ServiceType;
  quantity: number;
  unitPrice: number;
}

/**
 * The full invoice object.
 * Used by: the invoice DETAIL page (`app/invoice/[id]/page.tsx`)
 *          and by the mock/data layer in `lib/invoices.ts`.
 */
interface Invoice {
  id: string; // e.g. "HD-2025-0042"
  issueDate: string; // ISO date "YYYY-MM-DD"
  dueDate: string; // ISO date "YYYY-MM-DD"
  status: InvoiceStatus;
  customer: Customer;
  paymentMethod: PaymentMethod;
  items: LineItem[];
  discountCode?: string;
  /** Absolute dollar amount already applied (not a percentage). */
  discountAmount: number;
  /** Decimal, e.g. 0.0825 for 8.25%. */
  taxRate: number;
}

/* -------------------------------------------------------------------------- */
/*  Listing / query layer                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Lightweight projection of an Invoice for the LIST page.
 * Keeps the payload small and avoids shipping the full items array
 * when we only need counts and totals.
 */
interface InvoiceSummary {
  id: string;
  customerName: string;
  customerEmail: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  /** Pre-computed grand total (subtotal − discount + tax). */
  total: number;
  itemCount: number;
  /** De-duplicated list of service types present on the invoice. */
  serviceTypes: ServiceType[];
}

/* -------------------------------------------------------------------------- */
/*  Query params & result shape for listInvoices()                            */
/* -------------------------------------------------------------------------- */

type InvoiceSort = "date_desc" | "date_asc" | "amount_desc" | "amount_asc";

interface InvoiceListParams {
  search?: string;
  status?: InvoiceStatus | "all";
  sort?: InvoiceSort;
  page?: number;
  pageSize?: number;
}

interface InvoiceListResult {
  invoices: InvoiceSummary[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/* -------------------------------------------------------------------------- */
/*  Optional: derived / computed shapes                                       */
/* -------------------------------------------------------------------------- */

/**
 * The computed totals block used by the detail page's summary section.
 * Keeping it typed avoids re-declaring the same math in multiple components.
 */
interface InvoiceTotals {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
}
interface Option {
  label: string;
  value: string;
  description?: string;
}
