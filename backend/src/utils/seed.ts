import { connectDatabase } from "../config/database";
import { Template } from "../models/Template";
import { TemplateConfiguration } from "../models/TemplateConfiguration";

type Category = "taxInvoice" | "proformaInvoice" | "cancelledInvoice" | "quotation" | "serviceVoucher";
type SeedTheme = {
  primaryColor: string;
  secondaryColor: string;
  headerFont: string;
  bodyFont: string;
  footerFont: string;
  headerSize: number;
  bodySize: number;
  footerSize: number;
  headerBold: boolean;
  bodyBold: boolean;
  footerBold: boolean;
  alignment: string;
};

const svgDataUri = (title: string, primary: string, secondary: string, accent: string) =>
  `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="220" viewBox="0 0 360 220">
      <rect width="360" height="220" fill="#f8fafc"/>
      <rect x="12" y="12" width="336" height="196" rx="10" fill="#ffffff"/>
      <rect x="26" y="32" width="284" height="34" rx="5" fill="${primary}"/>
      <rect x="34" y="88" width="112" height="16" fill="${secondary}"/>
      <rect x="34" y="124" width="272" height="10" fill="${accent}"/>
      <rect x="34" y="150" width="218" height="10" fill="${accent}"/>
      <rect x="218" y="176" width="88" height="16" fill="${secondary}"/>
      <text x="24" y="204" fill="#111827" font-family="Arial" font-size="15" font-weight="700">${title}</text>
    </svg>
  `)}`;

const makeTemplate = (
  order: number,
  category: Category,
  name: string,
  description: string,
  primaryColor: string,
  secondaryColor: string,
  accent: string,
  theme: Omit<SeedTheme, "primaryColor" | "secondaryColor" | "bodyBold" | "footerBold">
) => ({
  name,
  description,
  category,
  thumbnail: svgDataUri(name, primaryColor, secondaryColor, accent),
  order,
  isActive: true,
  theme: {
    primaryColor,
    secondaryColor,
    bodyBold: false,
    footerBold: false,
    ...theme
  } satisfies SeedTheme
});

const templates = [
  makeTemplate(0, "taxInvoice", "Tax Invoice - Classic Ledger", "Skyshot tax invoice with billed-to details, invoice meta, item table, GST totals, declaration, and signatory.", "#0f172a", "#2563eb", "#dbeafe", { headerFont: "Roboto", bodyFont: "Arial", footerFont: "Open Sans", headerSize: 24, bodySize: 14, footerSize: 12, headerBold: true, alignment: "left" }),
  makeTemplate(1, "taxInvoice", "Tax Invoice - Compact Blue", "Compact one-page tax invoice with focused total and contact footer.", "#1d4ed8", "#0891b2", "#e0f2fe", { headerFont: "Arial", bodyFont: "Arial", footerFont: "Arial", headerSize: 23, bodySize: 13, footerSize: 11, headerBold: true, alignment: "center" }),
  makeTemplate(2, "taxInvoice", "Tax Invoice - Formal GST", "Formal GST invoice variation with neutral header, bordered summary table, and legal note.", "#111827", "#64748b", "#e2e8f0", { headerFont: "Times New Roman", bodyFont: "Open Sans", footerFont: "Arial", headerSize: 25, bodySize: 14, footerSize: 12, headerBold: true, alignment: "right" }),
  makeTemplate(10, "proformaInvoice", "Proforma - Estimate Sheet", "Proforma invoice with issued-to details, estimated amount column, GST and legal note.", "#155e75", "#06b6d4", "#cffafe", { headerFont: "Roboto", bodyFont: "Arial", footerFont: "Open Sans", headerSize: 25, bodySize: 14, footerSize: 12, headerBold: true, alignment: "left" }),
  makeTemplate(11, "proformaInvoice", "Proforma - Proposal Style", "Proposal-like proforma with colored title band and clear provisional disclaimer.", "#4c1d95", "#a855f7", "#ede9fe", { headerFont: "Open Sans", bodyFont: "Open Sans", footerFont: "Open Sans", headerSize: 26, bodySize: 14, footerSize: 12, headerBold: true, alignment: "center" }),
  makeTemplate(12, "proformaInvoice", "Proforma - Minimal", "Restrained proforma design optimized for quick estimates and approvals.", "#334155", "#94a3b8", "#f1f5f9", { headerFont: "Open Sans", bodyFont: "Open Sans", footerFont: "Arial", headerSize: 22, bodySize: 13, footerSize: 11, headerBold: false, alignment: "left" }),
  makeTemplate(20, "cancelledInvoice", "Cancelled Invoice - Red Stamp", "Cancelled invoice with dominant red cancellation status and invoice metadata.", "#7f1d1d", "#dc2626", "#fee2e2", { headerFont: "Roboto", bodyFont: "Arial", footerFont: "Open Sans", headerSize: 26, bodySize: 14, footerSize: 12, headerBold: true, alignment: "center" }),
  makeTemplate(21, "cancelledInvoice", "Cancelled Invoice - Audit Copy", "Audit-focused cancelled invoice with customer information and status highlighted.", "#111827", "#ef4444", "#f3f4f6", { headerFont: "Arial", bodyFont: "Arial", footerFont: "Arial", headerSize: 24, bodySize: 13, footerSize: 11, headerBold: true, alignment: "left" }),
  makeTemplate(22, "cancelledInvoice", "Cancelled Invoice - Notice", "Notice-style cancelled invoice variation for compliance and internal records.", "#991b1b", "#f97316", "#ffedd5", { headerFont: "Times New Roman", bodyFont: "Open Sans", footerFont: "Times New Roman", headerSize: 27, bodySize: 14, footerSize: 12, headerBold: true, alignment: "right" }),
  makeTemplate(30, "quotation", "Quotation - Itinerary Detail", "Travel quotation with quote details, guest data, itinerary, flights, transfers, hotels, and sightseeing.", "#1e3a8a", "#f97316", "#ffedd5", { headerFont: "Roboto", bodyFont: "Arial", footerFont: "Open Sans", headerSize: 26, bodySize: 14, footerSize: 12, headerBold: true, alignment: "left" }),
  makeTemplate(31, "quotation", "Quotation - Executive Summary", "Cleaner quotation with strong trip summary and grouped service sections.", "#064e3b", "#10b981", "#d1fae5", { headerFont: "Open Sans", bodyFont: "Open Sans", footerFont: "Arial", headerSize: 25, bodySize: 14, footerSize: 12, headerBold: true, alignment: "center" }),
  makeTemplate(32, "quotation", "Quotation - Travel Proposal", "Proposal-style quotation for destination itineraries and package inclusions.", "#312e81", "#818cf8", "#e0e7ff", { headerFont: "Times New Roman", bodyFont: "Open Sans", footerFont: "Times New Roman", headerSize: 28, bodySize: 15, footerSize: 12, headerBold: true, alignment: "left" }),
  makeTemplate(40, "serviceVoucher", "Service Voucher - Hotel", "Hotel voucher with booking reference, confirmation number, hotel detail, dates, rooms, and footer contacts.", "#0f766e", "#14b8a6", "#ccfbf1", { headerFont: "Roboto", bodyFont: "Open Sans", footerFont: "Open Sans", headerSize: 25, bodySize: 14, footerSize: 12, headerBold: true, alignment: "center" }),
  makeTemplate(41, "serviceVoucher", "Service Voucher - Transfer", "Transfer voucher version with pickup, drop-off, vehicle information, and passenger count.", "#0369a1", "#38bdf8", "#e0f2fe", { headerFont: "Arial", bodyFont: "Arial", footerFont: "Arial", headerSize: 23, bodySize: 13, footerSize: 11, headerBold: true, alignment: "left" }),
  makeTemplate(42, "serviceVoucher", "Service Voucher - Activity", "Voucher version for sightseeing, flight, food, and other compact service confirmations.", "#be123c", "#fb7185", "#ffe4e6", { headerFont: "Open Sans", bodyFont: "Arial", footerFont: "Open Sans", headerSize: 24, bodySize: 14, footerSize: 12, headerBold: true, alignment: "right" })
];

const seed = async () => {
  await connectDatabase();
  await Template.deleteMany({});
  await TemplateConfiguration.deleteMany({});
  const created = await Template.insertMany(templates);
  const defaultTemplate = created[0];

  await TemplateConfiguration.create({
    templateId: defaultTemplate._id,
    isDefault: true,
    primaryColor: defaultTemplate.theme?.primaryColor ?? "#0f172a",
    secondaryColor: defaultTemplate.theme?.secondaryColor ?? "#2563eb",
    headerFont: defaultTemplate.theme?.headerFont ?? "Roboto",
    bodyFont: defaultTemplate.theme?.bodyFont ?? "Arial",
    footerFont: defaultTemplate.theme?.footerFont ?? "Open Sans",
    headerSize: defaultTemplate.theme?.headerSize ?? 24,
    bodySize: defaultTemplate.theme?.bodySize ?? 14,
    footerSize: defaultTemplate.theme?.footerSize ?? 12,
    headerBold: defaultTemplate.theme?.headerBold ?? true,
    bodyBold: defaultTemplate.theme?.bodyBold ?? false,
    footerBold: defaultTemplate.theme?.footerBold ?? false,
    alignment: defaultTemplate.theme?.alignment ?? "left"
  });

  console.log("Seeded 15 real business document templates and default configuration");
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
