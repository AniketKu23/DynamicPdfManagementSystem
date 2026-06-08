import { DocumentCategory, Template } from "../types";

const labels: Record<DocumentCategory, string> = {
  taxInvoice: "Tax Invoice",
  proformaInvoice: "Proforma Invoice",
  cancelledInvoice: "Cancelled Invoice",
  quotation: "Quotation",
  serviceVoucher: "Service Voucher"
};

const svgDataUri = (title: string, primary: string, secondary: string, accent: string, category: DocumentCategory) => {
  const pattern: Record<DocumentCategory, string> = {
    taxInvoice: `<rect x="26" y="34" width="104" height="22" fill="${primary}"/><rect x="226" y="34" width="74" height="18" fill="${secondary}"/><rect x="26" y="88" width="280" height="18" fill="${secondary}"/><rect x="26" y="126" width="280" height="10" fill="${accent}"/><rect x="218" y="154" width="88" height="16" fill="${primary}"/>`,
    proformaInvoice: `<rect x="26" y="32" width="284" height="36" rx="4" fill="${primary}"/><rect x="44" y="92" width="118" height="14" fill="${secondary}"/><rect x="44" y="124" width="260" height="10" fill="${accent}"/><rect x="44" y="150" width="188" height="10" fill="${accent}"/>`,
    cancelledInvoice: `<rect x="26" y="32" width="284" height="36" rx="4" fill="${primary}"/><rect x="72" y="96" width="180" height="42" rx="5" fill="#fee2e2" stroke="${secondary}" stroke-width="3"/><text x="93" y="123" fill="${secondary}" font-family="Arial" font-size="20" font-weight="700">CANCELLED</text>`,
    quotation: `<rect x="24" y="28" width="286" height="30" fill="${primary}"/><rect x="34" y="84" width="116" height="18" fill="${secondary}"/><rect x="34" y="122" width="270" height="10" fill="${accent}"/><rect x="54" y="146" width="250" height="10" fill="${accent}"/><circle cx="38" cy="150" r="8" fill="${secondary}"/>`,
    serviceVoucher: `<rect x="24" y="30" width="286" height="34" rx="8" fill="${primary}"/><rect x="40" y="88" width="86" height="18" fill="${secondary}"/><rect x="40" y="124" width="248" height="12" fill="${accent}"/><path d="M24 164h286v22H24z" fill="${secondary}"/>`
  };

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="220" viewBox="0 0 360 220">
      <rect width="360" height="220" fill="#f8fafc"/>
      <rect x="12" y="12" width="336" height="196" rx="10" fill="#ffffff"/>
      ${pattern[category]}
      <text x="24" y="202" fill="#111827" font-family="Arial" font-size="15" font-weight="700">${title}</text>
    </svg>
  `)}`;
};

const template = (
  order: number,
  category: DocumentCategory,
  suffix: string,
  name: string,
  description: string,
  primaryColor: string,
  secondaryColor: string,
  accent: string,
  overrides: NonNullable<Template["theme"]>
): Template => ({
  _id: `template-${category}-${suffix}`,
  name,
  thumbnail: svgDataUri(name, primaryColor, secondaryColor, accent, category),
  description,
  category,
  isActive: true,
  order,
  theme: {
    primaryColor,
    secondaryColor,
    headerFont: "Roboto",
    bodyFont: "Arial",
    footerFont: "Open Sans",
    headerSize: 24,
    bodySize: 14,
    footerSize: 12,
    headerBold: true,
    bodyBold: false,
    footerBold: false,
    alignment: "left",
    ...overrides
  }
});

export const builtInThemes: Template[] = [
  template(0, "taxInvoice", "classic", "Tax Invoice - Classic Ledger", "Matches the Skyshot tax invoice: billed-to block, invoice meta, item table, GST totals, legal declaration, and signatory.", "#0f172a", "#2563eb", "#dbeafe", { alignment: "left", headerSize: 24 }),
  template(1, "taxInvoice", "compact", "Tax Invoice - Compact Blue", "A tighter invoice layout for one-page tax documents with emphasized total and contact footer.", "#1d4ed8", "#0891b2", "#e0f2fe", { alignment: "center", headerFont: "Arial", bodySize: 13 }),
  template(2, "taxInvoice", "formal", "Tax Invoice - Formal GST", "A formal GST invoice variation with neutral header, bordered summary table, and legal note section.", "#111827", "#64748b", "#e2e8f0", { alignment: "right", headerFont: "Times New Roman", footerFont: "Arial" }),

  template(10, "proformaInvoice", "estimate", "Proforma - Estimate Sheet", "Based on the proforma invoice with issued-to details, estimated amount column, GST and legal note.", "#155e75", "#06b6d4", "#cffafe", { alignment: "left", headerSize: 25 }),
  template(11, "proformaInvoice", "proposal", "Proforma - Proposal Style", "A proposal-like version with colored title band and clear provisional invoice disclaimer.", "#4c1d95", "#a855f7", "#ede9fe", { alignment: "center", headerFont: "Open Sans" }),
  template(12, "proformaInvoice", "minimal", "Proforma - Minimal", "A restrained proforma design optimized for quick estimates and approval workflows.", "#334155", "#94a3b8", "#f1f5f9", { alignment: "left", headerBold: false, bodyFont: "Open Sans" }),

  template(20, "cancelledInvoice", "stamp", "Cancelled Invoice - Red Stamp", "Uses the cancelled invoice as base with a dominant cancelled stamp and invoice metadata.", "#7f1d1d", "#dc2626", "#fee2e2", { alignment: "center", headerSize: 26 }),
  template(21, "cancelledInvoice", "audit", "Cancelled Invoice - Audit Copy", "Audit-focused cancelled invoice with customer information and cancellation status highlighted.", "#111827", "#ef4444", "#f3f4f6", { alignment: "left", headerFont: "Arial" }),
  template(22, "cancelledInvoice", "notice", "Cancelled Invoice - Notice", "A notice-style cancelled invoice variation for compliance and internal cancellation records.", "#991b1b", "#f97316", "#ffedd5", { alignment: "right", headerFont: "Times New Roman" }),

  template(30, "quotation", "itinerary", "Quotation - Itinerary Detail", "Recreates the travel quotation structure: quote details, guest data, itinerary, flights, transfers, hotels, and sightseeing.", "#1e3a8a", "#f97316", "#ffedd5", { alignment: "left", headerSize: 26 }),
  template(31, "quotation", "executive", "Quotation - Executive Summary", "A cleaner quotation version with strong trip summary and grouped service sections.", "#064e3b", "#10b981", "#d1fae5", { alignment: "center", headerFont: "Open Sans" }),
  template(32, "quotation", "travel", "Quotation - Travel Proposal", "A proposal-style quotation for destination itineraries and package inclusions.", "#312e81", "#818cf8", "#e0e7ff", { alignment: "left", headerFont: "Times New Roman", bodyFont: "Open Sans" }),

  template(40, "serviceVoucher", "hotel", "Service Voucher - Hotel", "Based on the hotel voucher: booking reference, confirmation number, hotel detail, stay dates, rooms, and footer contacts.", "#0f766e", "#14b8a6", "#ccfbf1", { alignment: "center", headerSize: 25 }),
  template(41, "serviceVoucher", "transfer", "Service Voucher - Transfer", "Transfer voucher version with pickup, drop-off, vehicle information, and passenger count.", "#0369a1", "#38bdf8", "#e0f2fe", { alignment: "left", headerFont: "Arial" }),
  template(42, "serviceVoucher", "activity", "Service Voucher - Activity", "Voucher version for sightseeing, flight, food, and other services with compact confirmation blocks.", "#be123c", "#fb7185", "#ffe4e6", { alignment: "right", headerFont: "Open Sans" })
];

export const getFallbackThemes = (search: string, category: string) => {
  const normalizedSearch = search.trim().toLowerCase();
  return builtInThemes.filter((theme) => {
    const matchesSearch =
      !normalizedSearch ||
      theme.name.toLowerCase().includes(normalizedSearch) ||
      theme.description.toLowerCase().includes(normalizedSearch) ||
      labels[theme.category].toLowerCase().includes(normalizedSearch);
    const matchesCategory = !category || theme.category === category;
    return matchesSearch && matchesCategory;
  });
};
