import { connectDatabase } from "../config/database";
import { Template } from "../models/Template";
import { TemplateConfiguration } from "../models/TemplateConfiguration";

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
  logo?: string;
};

const svgDataUri = (title: string, primary: string, secondary: string, accent: string) =>
  `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="220" viewBox="0 0 360 220">
      <rect width="360" height="220" fill="#f8fafc"/>
      <rect x="12" y="12" width="336" height="196" rx="12" fill="#ffffff"/>
      <rect x="28" y="30" width="304" height="36" rx="6" fill="${primary}"/>
      <rect x="32" y="86" width="116" height="14" fill="${secondary}"/>
      <rect x="32" y="122" width="276" height="12" fill="${accent}"/>
      <rect x="32" y="148" width="214" height="12" fill="${accent}"/>
      <rect x="224" y="176" width="84" height="18" fill="${secondary}"/>
      <text x="28" y="206" fill="#111827" font-family="Arial" font-size="16" font-weight="700">${title}</text>
    </svg>
  `)}`;

const makeTemplate = (
  order: number,
  name: string,
  description: string,
  category: "invoice" | "voucher" | "booking" | "quotation" | "report",
  primaryColor: string,
  secondaryColor: string,
  accent: string,
  theme: Omit<SeedTheme, "primaryColor" | "secondaryColor" | "bodyBold" | "footerBold" | "logo">
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
    logo: "",
    ...theme
  } satisfies SeedTheme
});

const templates = [
  makeTemplate(0, "Modern Invoice", "Bright SaaS invoice with clean headers and teal table accents.", "invoice", "#2563eb", "#14b8a6", "#dbeafe", { headerFont: "Roboto", bodyFont: "Arial", footerFont: "Open Sans", headerSize: 26, bodySize: 14, footerSize: 12, headerBold: true, alignment: "left" }),
  makeTemplate(1, "Corporate Invoice", "Formal neutral invoice for corporate billing and approvals.", "invoice", "#111827", "#64748b", "#e2e8f0", { headerFont: "Arial", bodyFont: "Arial", footerFont: "Arial", headerSize: 24, bodySize: 13, footerSize: 11, headerBold: true, alignment: "center" }),
  makeTemplate(2, "Premium Invoice", "Warm premium invoice with gold highlights and strong totals.", "invoice", "#7c2d12", "#f59e0b", "#fef3c7", { headerFont: "Times New Roman", bodyFont: "Open Sans", footerFont: "Open Sans", headerSize: 28, bodySize: 14, footerSize: 12, headerBold: true, alignment: "right" }),
  makeTemplate(3, "Minimal Invoice", "Minimal invoice with restrained colors and readable spacing.", "invoice", "#0f766e", "#94a3b8", "#ccfbf1", { headerFont: "Open Sans", bodyFont: "Open Sans", footerFont: "Arial", headerSize: 22, bodySize: 14, footerSize: 12, headerBold: false, alignment: "left" }),
  makeTemplate(10, "Travel Voucher", "Airline-inspired voucher with crisp destination sections.", "voucher", "#0284c7", "#22c55e", "#dcfce7", { headerFont: "Roboto", bodyFont: "Arial", footerFont: "Open Sans", headerSize: 25, bodySize: 14, footerSize: 12, headerBold: true, alignment: "center" }),
  makeTemplate(11, "Luxury Voucher", "Elegant voucher for premium travel and concierge bookings.", "voucher", "#4c1d95", "#c084fc", "#ede9fe", { headerFont: "Times New Roman", bodyFont: "Open Sans", footerFont: "Times New Roman", headerSize: 28, bodySize: 14, footerSize: 12, headerBold: true, alignment: "center" }),
  makeTemplate(12, "Family Voucher", "Friendly voucher style for packages, families, and holidays.", "voucher", "#be123c", "#fb7185", "#ffe4e6", { headerFont: "Open Sans", bodyFont: "Arial", footerFont: "Open Sans", headerSize: 24, bodySize: 15, footerSize: 12, headerBold: true, alignment: "left" }),
  makeTemplate(13, "Business Voucher", "Compact travel voucher for work trips and reimbursements.", "voucher", "#334155", "#06b6d4", "#cffafe", { headerFont: "Arial", bodyFont: "Arial", footerFont: "Arial", headerSize: 23, bodySize: 13, footerSize: 11, headerBold: true, alignment: "right" }),
  makeTemplate(20, "Hotel Booking", "Clean hotel confirmation with calm hospitality colors.", "booking", "#0f766e", "#2dd4bf", "#ccfbf1", { headerFont: "Roboto", bodyFont: "Open Sans", footerFont: "Open Sans", headerSize: 25, bodySize: 14, footerSize: 12, headerBold: true, alignment: "center" }),
  makeTemplate(21, "Event Booking", "Expressive confirmation for events, tickets, and venues.", "booking", "#9333ea", "#f472b6", "#fce7f3", { headerFont: "Open Sans", bodyFont: "Arial", footerFont: "Open Sans", headerSize: 27, bodySize: 14, footerSize: 12, headerBold: true, alignment: "left" }),
  makeTemplate(22, "Clinic Booking", "Trustworthy appointment confirmation for care teams.", "booking", "#0369a1", "#38bdf8", "#e0f2fe", { headerFont: "Arial", bodyFont: "Open Sans", footerFont: "Arial", headerSize: 23, bodySize: 14, footerSize: 12, headerBold: true, alignment: "left" }),
  makeTemplate(23, "Resort Booking", "Lush confirmation theme for resorts and leisure stays.", "booking", "#166534", "#84cc16", "#ecfccb", { headerFont: "Times New Roman", bodyFont: "Open Sans", footerFont: "Open Sans", headerSize: 28, bodySize: 15, footerSize: 12, headerBold: true, alignment: "right" }),
  makeTemplate(30, "Sales Quotation", "High-contrast quote for sales teams and quick approvals.", "quotation", "#1d4ed8", "#f97316", "#ffedd5", { headerFont: "Roboto", bodyFont: "Arial", footerFont: "Open Sans", headerSize: 25, bodySize: 14, footerSize: 12, headerBold: true, alignment: "left" }),
  makeTemplate(31, "Consulting Quote", "Professional quote for proposals and advisory services.", "quotation", "#374151", "#10b981", "#d1fae5", { headerFont: "Open Sans", bodyFont: "Open Sans", footerFont: "Arial", headerSize: 24, bodySize: 14, footerSize: 12, headerBold: true, alignment: "center" }),
  makeTemplate(32, "Creative Quote", "Colorful quotation style for agencies and studios.", "quotation", "#db2777", "#8b5cf6", "#f5d0fe", { headerFont: "Roboto", bodyFont: "Open Sans", footerFont: "Open Sans", headerSize: 27, bodySize: 14, footerSize: 12, headerBold: true, alignment: "right" }),
  makeTemplate(33, "Industrial Quote", "Grounded quote style for equipment and procurement.", "quotation", "#57534e", "#eab308", "#fef9c3", { headerFont: "Arial", bodyFont: "Arial", footerFont: "Arial", headerSize: 23, bodySize: 13, footerSize: 11, headerBold: true, alignment: "left" }),
  makeTemplate(40, "Executive Report", "Polished executive report with strong KPI hierarchy.", "report", "#0f172a", "#0ea5e9", "#e0f2fe", { headerFont: "Roboto", bodyFont: "Open Sans", footerFont: "Open Sans", headerSize: 26, bodySize: 14, footerSize: 12, headerBold: true, alignment: "left" }),
  makeTemplate(41, "Finance Report", "Finance report theme for performance and variance tables.", "report", "#064e3b", "#22c55e", "#dcfce7", { headerFont: "Arial", bodyFont: "Arial", footerFont: "Arial", headerSize: 24, bodySize: 13, footerSize: 11, headerBold: true, alignment: "right" }),
  makeTemplate(42, "Operations Report", "Operational status report for incidents, trends, and KPIs.", "report", "#7f1d1d", "#ef4444", "#fee2e2", { headerFont: "Open Sans", bodyFont: "Open Sans", footerFont: "Arial", headerSize: 25, bodySize: 14, footerSize: 12, headerBold: true, alignment: "center" }),
  makeTemplate(43, "Research Report", "Editorial report style for findings and structured analysis.", "report", "#312e81", "#818cf8", "#e0e7ff", { headerFont: "Times New Roman", bodyFont: "Open Sans", footerFont: "Times New Roman", headerSize: 28, bodySize: 15, footerSize: 12, headerBold: true, alignment: "center" })
];

const seed = async () => {
  await connectDatabase();
  await Template.deleteMany({});
  await TemplateConfiguration.deleteMany({});
  const created = await Template.insertMany(templates);
  const defaultTemplate = created.find((template) => template.name === "Corporate Invoice") ?? created[0];

  await TemplateConfiguration.create({
    templateId: defaultTemplate._id,
    isDefault: true,
    primaryColor: defaultTemplate.theme?.primaryColor ?? "#111827",
    secondaryColor: defaultTemplate.theme?.secondaryColor ?? "#64748b",
    headerFont: defaultTemplate.theme?.headerFont ?? "Arial",
    bodyFont: defaultTemplate.theme?.bodyFont ?? "Arial",
    footerFont: defaultTemplate.theme?.footerFont ?? "Arial",
    headerSize: defaultTemplate.theme?.headerSize ?? 24,
    bodySize: defaultTemplate.theme?.bodySize ?? 13,
    footerSize: defaultTemplate.theme?.footerSize ?? 11,
    headerBold: defaultTemplate.theme?.headerBold ?? true,
    bodyBold: defaultTemplate.theme?.bodyBold ?? false,
    footerBold: defaultTemplate.theme?.footerBold ?? false,
    alignment: defaultTemplate.theme?.alignment ?? "center"
  });

  console.log("Seeded 20 templates and default configuration");
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
