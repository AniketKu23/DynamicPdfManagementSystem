import { Template } from "../types";

const svgDataUri = (title: string, primary: string, secondary: string, accent: string, pattern: "invoice" | "voucher" | "booking" | "quotation" | "report") => {
  const shapes = {
    invoice: `<rect x="24" y="28" width="264" height="32" rx="4" fill="${primary}"/><rect x="24" y="78" width="116" height="12" fill="${secondary}"/><rect x="24" y="108" width="264" height="10" fill="${accent}"/><rect x="24" y="132" width="264" height="10" fill="${accent}"/><rect x="198" y="158" width="90" height="16" fill="${secondary}"/>`,
    voucher: `<circle cx="62" cy="62" r="30" fill="${primary}"/><rect x="108" y="42" width="184" height="18" fill="${secondary}"/><path d="M24 124h288v38H24z" fill="${accent}"/><path d="M248 124a19 19 0 0 0 0 38" fill="#fff"/>`,
    booking: `<rect x="34" y="34" width="252" height="132" rx="12" fill="#fff" stroke="${secondary}" stroke-width="4"/><rect x="54" y="56" width="92" height="20" fill="${primary}"/><rect x="54" y="104" width="198" height="12" fill="${accent}"/><rect x="54" y="130" width="138" height="12" fill="${accent}"/>`,
    quotation: `<rect x="28" y="28" width="264" height="146" rx="8" fill="#fff" stroke="${primary}" stroke-width="4"/><rect x="50" y="56" width="220" height="16" fill="${secondary}"/><rect x="50" y="96" width="160" height="12" fill="${accent}"/><rect x="204" y="132" width="66" height="26" fill="${primary}"/>`,
    report: `<rect x="30" y="32" width="260" height="34" fill="${primary}"/><rect x="50" y="96" width="44" height="72" fill="${secondary}"/><rect x="122" y="118" width="44" height="50" fill="${accent}"/><rect x="194" y="78" width="44" height="90" fill="${secondary}"/><rect x="258" y="108" width="12" height="60" fill="${primary}"/>`
  };

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="220" viewBox="0 0 360 220">
      <rect width="360" height="220" fill="#f8fafc"/>
      <rect x="12" y="12" width="336" height="196" rx="12" fill="#ffffff"/>
      ${shapes[pattern]}
      <text x="24" y="200" fill="#111827" font-family="Arial" font-size="16" font-weight="700">${title}</text>
    </svg>
  `)}`;
};

export const builtInThemes: Template[] = [
  {
    _id: "theme-invoice-modern",
    name: "Modern Invoice",
    thumbnail: svgDataUri("Modern Invoice", "#2563eb", "#14b8a6", "#dbeafe", "invoice"),
    description: "Bright SaaS invoice with clean headers and teal table accents.",
    category: "invoice",
    isActive: true,
    order: 0,
    theme: { primaryColor: "#2563eb", secondaryColor: "#14b8a6", headerFont: "Roboto", bodyFont: "Arial", footerFont: "Open Sans", headerSize: 26, bodySize: 14, footerSize: 12, headerBold: true, alignment: "left" }
  },
  {
    _id: "theme-invoice-corporate",
    name: "Corporate Invoice",
    thumbnail: svgDataUri("Corporate Invoice", "#111827", "#64748b", "#e2e8f0", "invoice"),
    description: "Formal neutral invoice for corporate billing and approvals.",
    category: "invoice",
    isActive: true,
    order: 1,
    theme: { primaryColor: "#111827", secondaryColor: "#64748b", headerFont: "Arial", bodyFont: "Arial", footerFont: "Arial", headerSize: 24, bodySize: 13, footerSize: 11, headerBold: true, alignment: "center" }
  },
  {
    _id: "theme-invoice-premium",
    name: "Premium Invoice",
    thumbnail: svgDataUri("Premium Invoice", "#7c2d12", "#f59e0b", "#fef3c7", "invoice"),
    description: "Warm premium invoice with gold highlights and strong totals.",
    category: "invoice",
    isActive: true,
    order: 2,
    theme: { primaryColor: "#7c2d12", secondaryColor: "#f59e0b", headerFont: "Times New Roman", bodyFont: "Open Sans", footerFont: "Open Sans", headerSize: 28, bodySize: 14, footerSize: 12, headerBold: true, alignment: "right" }
  },
  {
    _id: "theme-invoice-minimal",
    name: "Minimal Invoice",
    thumbnail: svgDataUri("Minimal Invoice", "#0f766e", "#94a3b8", "#ccfbf1", "invoice"),
    description: "Minimal invoice with restrained colors and readable spacing.",
    category: "invoice",
    isActive: true,
    order: 3,
    theme: { primaryColor: "#0f766e", secondaryColor: "#94a3b8", headerFont: "Open Sans", bodyFont: "Open Sans", footerFont: "Arial", headerSize: 22, bodySize: 14, footerSize: 12, headerBold: false, alignment: "left" }
  },
  {
    _id: "theme-voucher-travel",
    name: "Travel Voucher",
    thumbnail: svgDataUri("Travel Voucher", "#0284c7", "#22c55e", "#dcfce7", "voucher"),
    description: "Airline-inspired voucher with crisp destination sections.",
    category: "voucher",
    isActive: true,
    order: 10,
    theme: { primaryColor: "#0284c7", secondaryColor: "#22c55e", headerFont: "Roboto", bodyFont: "Arial", footerFont: "Open Sans", headerSize: 25, bodySize: 14, footerSize: 12, headerBold: true, alignment: "center" }
  },
  {
    _id: "theme-voucher-luxury",
    name: "Luxury Voucher",
    thumbnail: svgDataUri("Luxury Voucher", "#4c1d95", "#c084fc", "#ede9fe", "voucher"),
    description: "Elegant voucher for premium travel and concierge bookings.",
    category: "voucher",
    isActive: true,
    order: 11,
    theme: { primaryColor: "#4c1d95", secondaryColor: "#c084fc", headerFont: "Times New Roman", bodyFont: "Open Sans", footerFont: "Times New Roman", headerSize: 28, bodySize: 14, footerSize: 12, headerBold: true, alignment: "center" }
  },
  {
    _id: "theme-voucher-family",
    name: "Family Voucher",
    thumbnail: svgDataUri("Family Voucher", "#be123c", "#fb7185", "#ffe4e6", "voucher"),
    description: "Friendly voucher style for packages, families, and holidays.",
    category: "voucher",
    isActive: true,
    order: 12,
    theme: { primaryColor: "#be123c", secondaryColor: "#fb7185", headerFont: "Open Sans", bodyFont: "Arial", footerFont: "Open Sans", headerSize: 24, bodySize: 15, footerSize: 12, headerBold: true, alignment: "left" }
  },
  {
    _id: "theme-voucher-business",
    name: "Business Voucher",
    thumbnail: svgDataUri("Business Voucher", "#334155", "#06b6d4", "#cffafe", "voucher"),
    description: "Compact travel voucher for work trips and reimbursements.",
    category: "voucher",
    isActive: true,
    order: 13,
    theme: { primaryColor: "#334155", secondaryColor: "#06b6d4", headerFont: "Arial", bodyFont: "Arial", footerFont: "Arial", headerSize: 23, bodySize: 13, footerSize: 11, headerBold: true, alignment: "right" }
  },
  {
    _id: "theme-booking-hotel",
    name: "Hotel Booking",
    thumbnail: svgDataUri("Hotel Booking", "#0f766e", "#2dd4bf", "#ccfbf1", "booking"),
    description: "Clean hotel confirmation with calm hospitality colors.",
    category: "booking",
    isActive: true,
    order: 20,
    theme: { primaryColor: "#0f766e", secondaryColor: "#2dd4bf", headerFont: "Roboto", bodyFont: "Open Sans", footerFont: "Open Sans", headerSize: 25, bodySize: 14, footerSize: 12, headerBold: true, alignment: "center" }
  },
  {
    _id: "theme-booking-event",
    name: "Event Booking",
    thumbnail: svgDataUri("Event Booking", "#9333ea", "#f472b6", "#fce7f3", "booking"),
    description: "Expressive confirmation for events, tickets, and venues.",
    category: "booking",
    isActive: true,
    order: 21,
    theme: { primaryColor: "#9333ea", secondaryColor: "#f472b6", headerFont: "Open Sans", bodyFont: "Arial", footerFont: "Open Sans", headerSize: 27, bodySize: 14, footerSize: 12, headerBold: true, alignment: "left" }
  },
  {
    _id: "theme-booking-clinic",
    name: "Clinic Booking",
    thumbnail: svgDataUri("Clinic Booking", "#0369a1", "#38bdf8", "#e0f2fe", "booking"),
    description: "Trustworthy appointment confirmation for care teams.",
    category: "booking",
    isActive: true,
    order: 22,
    theme: { primaryColor: "#0369a1", secondaryColor: "#38bdf8", headerFont: "Arial", bodyFont: "Open Sans", footerFont: "Arial", headerSize: 23, bodySize: 14, footerSize: 12, headerBold: true, alignment: "left" }
  },
  {
    _id: "theme-booking-resort",
    name: "Resort Booking",
    thumbnail: svgDataUri("Resort Booking", "#166534", "#84cc16", "#ecfccb", "booking"),
    description: "Lush confirmation theme for resorts and leisure stays.",
    category: "booking",
    isActive: true,
    order: 23,
    theme: { primaryColor: "#166534", secondaryColor: "#84cc16", headerFont: "Times New Roman", bodyFont: "Open Sans", footerFont: "Open Sans", headerSize: 28, bodySize: 15, footerSize: 12, headerBold: true, alignment: "right" }
  },
  {
    _id: "theme-quotation-sales",
    name: "Sales Quotation",
    thumbnail: svgDataUri("Sales Quotation", "#1d4ed8", "#f97316", "#ffedd5", "quotation"),
    description: "High-contrast quote for sales teams and quick approvals.",
    category: "quotation",
    isActive: true,
    order: 30,
    theme: { primaryColor: "#1d4ed8", secondaryColor: "#f97316", headerFont: "Roboto", bodyFont: "Arial", footerFont: "Open Sans", headerSize: 25, bodySize: 14, footerSize: 12, headerBold: true, alignment: "left" }
  },
  {
    _id: "theme-quotation-consulting",
    name: "Consulting Quote",
    thumbnail: svgDataUri("Consulting Quote", "#374151", "#10b981", "#d1fae5", "quotation"),
    description: "Professional quote for proposals and advisory services.",
    category: "quotation",
    isActive: true,
    order: 31,
    theme: { primaryColor: "#374151", secondaryColor: "#10b981", headerFont: "Open Sans", bodyFont: "Open Sans", footerFont: "Arial", headerSize: 24, bodySize: 14, footerSize: 12, headerBold: true, alignment: "center" }
  },
  {
    _id: "theme-quotation-creative",
    name: "Creative Quote",
    thumbnail: svgDataUri("Creative Quote", "#db2777", "#8b5cf6", "#f5d0fe", "quotation"),
    description: "Colorful quotation style for agencies and studios.",
    category: "quotation",
    isActive: true,
    order: 32,
    theme: { primaryColor: "#db2777", secondaryColor: "#8b5cf6", headerFont: "Roboto", bodyFont: "Open Sans", footerFont: "Open Sans", headerSize: 27, bodySize: 14, footerSize: 12, headerBold: true, alignment: "right" }
  },
  {
    _id: "theme-quotation-industrial",
    name: "Industrial Quote",
    thumbnail: svgDataUri("Industrial Quote", "#57534e", "#eab308", "#fef9c3", "quotation"),
    description: "Grounded quote style for equipment and procurement.",
    category: "quotation",
    isActive: true,
    order: 33,
    theme: { primaryColor: "#57534e", secondaryColor: "#eab308", headerFont: "Arial", bodyFont: "Arial", footerFont: "Arial", headerSize: 23, bodySize: 13, footerSize: 11, headerBold: true, alignment: "left" }
  },
  {
    _id: "theme-report-executive",
    name: "Executive Report",
    thumbnail: svgDataUri("Executive Report", "#0f172a", "#0ea5e9", "#e0f2fe", "report"),
    description: "Polished executive report with strong KPI hierarchy.",
    category: "report",
    isActive: true,
    order: 40,
    theme: { primaryColor: "#0f172a", secondaryColor: "#0ea5e9", headerFont: "Roboto", bodyFont: "Open Sans", footerFont: "Open Sans", headerSize: 26, bodySize: 14, footerSize: 12, headerBold: true, alignment: "left" }
  },
  {
    _id: "theme-report-finance",
    name: "Finance Report",
    thumbnail: svgDataUri("Finance Report", "#064e3b", "#22c55e", "#dcfce7", "report"),
    description: "Finance report theme for performance and variance tables.",
    category: "report",
    isActive: true,
    order: 41,
    theme: { primaryColor: "#064e3b", secondaryColor: "#22c55e", headerFont: "Arial", bodyFont: "Arial", footerFont: "Arial", headerSize: 24, bodySize: 13, footerSize: 11, headerBold: true, alignment: "right" }
  },
  {
    _id: "theme-report-operations",
    name: "Operations Report",
    thumbnail: svgDataUri("Operations Report", "#7f1d1d", "#ef4444", "#fee2e2", "report"),
    description: "Operational status report for incidents, trends, and KPIs.",
    category: "report",
    isActive: true,
    order: 42,
    theme: { primaryColor: "#7f1d1d", secondaryColor: "#ef4444", headerFont: "Open Sans", bodyFont: "Open Sans", footerFont: "Arial", headerSize: 25, bodySize: 14, footerSize: 12, headerBold: true, alignment: "center" }
  },
  {
    _id: "theme-report-research",
    name: "Research Report",
    thumbnail: svgDataUri("Research Report", "#312e81", "#818cf8", "#e0e7ff", "report"),
    description: "Editorial report style for findings and structured analysis.",
    category: "report",
    isActive: true,
    order: 43,
    theme: { primaryColor: "#312e81", secondaryColor: "#818cf8", headerFont: "Times New Roman", bodyFont: "Open Sans", footerFont: "Times New Roman", headerSize: 28, bodySize: 15, footerSize: 12, headerBold: true, alignment: "center" }
  }
];

export const getFallbackThemes = (search: string, category: string) => {
  const normalizedSearch = search.trim().toLowerCase();
  return builtInThemes.filter((theme) => {
    const matchesSearch =
      !normalizedSearch ||
      theme.name.toLowerCase().includes(normalizedSearch) ||
      theme.description.toLowerCase().includes(normalizedSearch);
    const matchesCategory = !category || theme.category === category;
    return matchesSearch && matchesCategory;
  });
};
