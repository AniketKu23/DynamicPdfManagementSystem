export type PdfRenderConfiguration = {
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

type RenderInput = {
  documentType: string;
  data: Record<string, unknown>;
  configuration: PdfRenderConfiguration;
  templateName: string;
};

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const value = (data: Record<string, unknown>, key: string, fallback = "") => escapeHtml(data[key] ?? fallback);

const baseStyles = (configuration: PdfRenderConfiguration, layoutType: 1 | 2 | 3) => {
  const isLayout1 = layoutType === 1;
  const isLayout2 = layoutType === 2;
  const isLayout3 = layoutType === 3;

  return `
  @page { margin: 40px; }
  * { box-sizing: border-box; }
  body {
    color: #111827;
    font-family: "${configuration.bodyFont}", Arial, sans-serif;
    font-size: ${configuration.bodySize}px;
    margin: 0;
    line-height: 1.5;
  }
  .document {
    padding: 0;
    min-height: 980px;
    position: relative;
    ${isLayout3 ? `border: 1px solid ${configuration.secondaryColor}; padding: 20px;` : ''}
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 40px;
    ${isLayout2 ? `background: ${configuration.primaryColor}; color: #fff; padding: 20px; border-radius: 8px;` : ''}
    ${isLayout3 ? `border-bottom: 2px solid ${configuration.primaryColor}; padding-bottom: 20px;` : ''}
  }
  .header-left h1 {
    font-family: "${configuration.headerFont}", Arial, sans-serif;
    font-size: ${configuration.headerSize}px;
    font-weight: ${configuration.headerBold ? 700 : 400};
    margin: 0 0 5px 0;
    ${isLayout1 ? `color: #111827;` : ''}
  }
  .header-right {
    text-align: right;
  }
  .header-right .logo {
    max-height: 60px;
    max-width: 150px;
    object-fit: contain;
    ${isLayout2 ? `background: #fff; padding: 4px; border-radius: 4px;` : ''}
  }
  .header-right h2 {
    font-family: "${configuration.headerFont}", Arial, sans-serif;
    font-size: ${configuration.headerSize + 4}px;
    margin: 0 0 10px 0;
    font-weight: 400;
    ${isLayout1 ? `color: #111827;` : ''}
  }
  .meta-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
  }
  .meta-box {
    ${isLayout2 ? `background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;` : ''}
    ${isLayout3 ? `border-left: 3px solid ${configuration.secondaryColor}; padding-left: 15px;` : ''}
  }
  .meta-title {
    font-weight: 700;
    margin-bottom: 5px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 30px;
    font-family: "${configuration.bodyFont}", Arial, sans-serif;
  }
  th {
    text-align: left;
    padding: 12px 8px;
    font-weight: 700;
    ${isLayout1 ? `border-top: 1px solid #111827; border-bottom: 1px solid #111827;` : ''}
    ${isLayout2 ? `background: ${configuration.secondaryColor}; color: #fff;` : ''}
    ${isLayout3 ? `background: #f1f5f9; border-bottom: 2px solid ${configuration.primaryColor};` : ''}
  }
  td {
    padding: 12px 8px;
    vertical-align: top;
    font-weight: ${configuration.bodyBold ? 700 : 400};
    ${isLayout1 ? `border-bottom: 1px solid #e5e7eb;` : ''}
    ${isLayout2 ? `border-bottom: 1px solid #e2e8f0;` : ''}
    ${isLayout3 ? `border-bottom: 1px solid #e5e7eb;` : ''}
  }
  .amount { text-align: right; }
  .totals {
    width: 300px;
    margin-left: auto;
    margin-bottom: 40px;
  }
  .totals-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
  }
  .totals-row.grand-total {
    ${isLayout1 ? `background: #111827; color: #fff; padding: 12px; font-weight: 700; font-size: 16px; margin-top: 10px;` : ''}
    ${isLayout2 ? `background: ${configuration.primaryColor}; color: #fff; padding: 12px; border-radius: 4px; font-weight: 700; font-size: 16px; margin-top: 10px;` : ''}
    ${isLayout3 ? `border-top: 2px solid ${configuration.primaryColor}; border-bottom: 2px solid ${configuration.primaryColor}; padding: 12px 0; font-weight: 700; font-size: 16px; margin-top: 10px;` : ''}
  }
  .footer-note {
    font-size: 12px;
    color: #4b5563;
    margin-bottom: 40px;
    ${isLayout2 ? `background: #f8fafc; padding: 15px; border-left: 3px solid ${configuration.primaryColor};` : ''}
  }
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 50px;
    font-family: "${configuration.footerFont}", Arial, sans-serif;
    font-size: ${configuration.footerSize}px;
    font-weight: ${configuration.footerBold ? 700 : 400};
  }
  .watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: 120px;
    color: rgba(226, 232, 240, 0.6);
    font-weight: 800;
    z-index: -1;
    white-space: nowrap;
    letter-spacing: 10px;
  }
  .timeline {
    ${isLayout1 ? `border-left: 1px solid #d1d5db; margin-left: 10px; padding-left: 20px;` : ''}
    ${isLayout2 ? `border-left: 3px solid ${configuration.secondaryColor}; margin-left: 10px; padding-left: 20px;` : ''}
    ${isLayout3 ? `padding-left: 10px;` : ''}
  }
  .timeline-item {
    margin-bottom: 20px;
    ${isLayout3 ? `border-left: 3px solid ${configuration.primaryColor}; padding-left: 15px;` : ''}
  }
  .pill {
    background: #f1f5f9;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 12px;
    border: 1px solid #e2e8f0;
  }
`;
};

const determineLayoutType = (templateName: string): 1 | 2 | 3 => {
  const name = templateName.toLowerCase();
  if (name.includes("classic") || name.includes("minimal") || name.includes("audit") || name.includes("executive") || name.includes("transfer")) return 2;
  if (name.includes("formal") || name.includes("notice") || name.includes("proposal") || name.includes("activity")) return 3;
  return 1; // Default to layout 1 which matches the original attached images
};

const renderInvoiceBody = (data: Record<string, unknown>, mode: "tax" | "proforma" | "cancelled", layout: 1 | 2 | 3, configuration: PdfRenderConfiguration) => {
  const isProforma = mode === "proforma";
  const isCancelled = mode === "cancelled";
  
  return `
    <div class="meta-grid">
      <div class="meta-box">
        <div class="meta-title">${isProforma ? "Issued To:" : "Billed To:"}</div>
        <div>${value(data, "customerName", "Mr. Anurag Singh Chauhan")}</div>
        <div>${value(data, "customerEmail", value(data, "customerPhone", "+919482789893"))}</div>
        <div>${value(data, "customerCity", "New Delhi")}</div>
      </div>
      <div class="meta-box" style="text-align: right;">
        <div>${isProforma ? `Date: ${value(data, "documentDate", "Sat Jun 06 2026")}` : `Invoice No: ${value(data, "invoiceNumber", "INV0002")}<br/>Invoice Date: ${value(data, "invoiceDate", "Thu Mar 05 2026")}`}</div>
      </div>
    </div>

    ${isCancelled ? `<div class="watermark">${value(data, "status", "CANCELLED")}</div>` : ""}

    ${!isCancelled ? `
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Details</th>
          <th class="amount">${isProforma ? "Estimated Amount" : "Total"}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Quotation</td>
          <td>${value(data, "packageName", "Tokyo Revengers - Testing (1 Adults)")}</td>
          <td class="amount">₹${value(data, "subtotal", "877450.00")}</td>
        </tr>
        <tr>
          <td>Travel Dates</td>
          <td>${value(data, "travelDates", "Thu Mar 05 2026 - Sun Mar 08 2026 (3 Nights / 4 Days)")}</td>
          <td class="amount">—</td>
        </tr>
      </tbody>
    </table>

    <div class="totals">
      <div class="totals-row">
        <span>Subtotal</span>
        <span>₹${value(data, "subtotal", "877450.00")}</span>
      </div>
      <div class="totals-row">
        <span>GST</span>
        <span>₹${value(data, "gst", "43872.50")}</span>
      </div>
      <div class="totals-row grand-total">
        <span>Total</span>
        <span>₹${value(data, "total", "921322.50")}</span>
      </div>
    </div>
    ` : '<div style="height: 300px;"></div>'}

    <div class="footer-note">
      <div style="font-weight: 700; margin-bottom: 5px;">${isProforma ? "Proforma Invoice – Legal Note" : "GST & Legal Declaration"}</div>
      ${isProforma 
        ? "This is a Proforma Invoice issued for quotation and estimation purposes only and does not constitute a tax invoice under the Goods and Services Tax Act, 2017. The amounts mentioned above are indicative and subject to change at the time of issuance of the final tax invoice. No input tax credit can be claimed on the basis of this document." 
        : "This is a computer-generated tax invoice issued in accordance with the provisions of the Central Goods and Services Tax Act, 2017 and the corresponding State GST Act. GST has been charged as per applicable laws. TCS has been collected under Section 206C(1G) of the Income Tax Act, 1961, wherever applicable. This invoice is valid without a physical signature."}
    </div>

    <div class="footer-bottom">
      <div>
        ${!isProforma && !isCancelled ? `<h2 style="font-family: '${configuration.headerFont}', Arial, sans-serif; margin: 0 0 20px 0; font-size: 24px; font-weight: 400;">Thank You!</h2>` : ''}
        <div style="font-weight: 700; margin-bottom: 5px;">Contact Information</div>
        <div>Skyshot Travels</div>
        <div>techwithkunnu0853@gmail.com</div>
        <div>+919650533375</div>
      </div>
      <div style="text-align: right;">
        <div>Authorized Signatory</div>
        <div style="margin-top: 5px;">Skyshot Travels</div>
      </div>
    </div>
  `;
};

const renderQuotationBody = (data: Record<string, unknown>, layout: 1 | 2 | 3, configuration: PdfRenderConfiguration) => {
  return `
    <div style="text-align: center; margin-bottom: 30px;">
      <h2 style="font-family: '${configuration.headerFont}', Arial, sans-serif; font-size: 24px; margin: 0 0 10px 0;">${value(data, "title", "Tokyo Revengers - Testing")}</h2>
    </div>
    
    <div class="meta-grid" style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 30px; background: #fff;">
      <div class="meta-box">
        <div><strong>Destinations:</strong> ${value(data, "destinations", "Higashi-osaka, Tokyo")}</div>
        <div><strong>Quote Reference No:</strong> ${value(data, "quoteReference", "Tokyo Revengers - Testing")}</div>
        <div><strong>Quote Date:</strong> ${value(data, "quoteDate", "Thu Mar 05 2026")}</div>
        <div><strong>Enquiry ID:</strong> ${value(data, "enquiryId", "SKTR-000001")}</div>
      </div>
      <div class="meta-box" style="text-align: right;">
        <div><strong>Name:</strong> ${value(data, "customerName", "Mr. Anurag Singh Chauhan")}</div>
        <div><strong>Email:</strong> ${value(data, "email", "anurag@gmail.com")}</div>
        <div><strong>Phone:</strong> ${value(data, "phone", "+919482789893")}</div>
        <div><strong>No. of Guest:</strong> ${value(data, "guests", "1")}</div>
      </div>
    </div>

    <div style="text-align: center; font-weight: 700; font-size: 18px; margin-bottom: 20px;">Itinerary Details</div>
    
    <div style="border-top: 2px solid #111827; border-bottom: 2px solid #111827; padding: 10px 0; margin-bottom: 20px;">
      <h3 style="margin: 0; font-size: 18px;">Flight Details</h3>
      <div style="font-size: 12px; color: #4b5563;">Round Trip</div>
    </div>

    <div class="timeline" style="margin-bottom: 40px;">
      <div class="timeline-item">
        <strong>Outbound</strong>
        <div style="margin-top: 10px; font-size: 12px;">
          <div>Journey details :</div>
          <div>✈️ Indigo Airlines (6E)</div>
          <div>Indira Gandhi Int'l (DEL), Wed Mar 04 2026 | 2:30 ➔ Suvarnabhumi International (BKK), 5:00</div>
        </div>
      </div>
      <div class="timeline-item">
        <strong>Inbound</strong>
        <div style="margin-top: 10px; font-size: 12px;">
          <div>Journey details :</div>
          <div>✈️ Air India Express (IX)</div>
          <div>Narita (NRT), Mon Mar 09 2026 | 5:08 ➔ Suvarnabhumi International (BKK), 18:30</div>
        </div>
        <div style="margin-top: 10px; font-size: 12px;"><strong>Additional Info:</strong> Baggage are included in flights</div>
      </div>
    </div>

    <div style="border-top: 2px solid #111827; border-bottom: 2px solid #111827; padding: 10px 0; margin-bottom: 20px;">
      <h3 style="margin: 0; font-size: 18px;">${value(data, "itineraryDay", "Thu Mar 05 2026 / Trip Start Day (Day 1)")}</h3>
      <div style="font-size: 12px; color: #4b5563;">Trip is getting start from this day</div>
    </div>

    <div class="timeline">
      <div class="timeline-item">
        <strong>Transfer</strong>
        <div style="margin-top: 10px; font-size: 14px;">
          🚌 Hotel-to-point
        </div>
      </div>
    </div>
  `;
};

const renderVoucherBody = (data: Record<string, unknown>, layout: 1 | 2 | 3, configuration: PdfRenderConfiguration) => {
  return `
    <div style="border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; padding: 20px 0; margin-bottom: 40px; display: grid; grid-template-columns: 1fr 1fr;">
      <div>
        <div><strong>Name:</strong> ${value(data, "customerName", "Mr. Anurag Singh Chauhan")}</div>
        <div><strong>Phone:</strong> ${value(data, "phone", "+919482789893")}</div>
        <div><strong>Email:</strong> ${value(data, "email", "anurag@gmail.com")}</div>
      </div>
      <div>
        <div><strong>Booking Reference:</strong> ${value(data, "bookingReference", "Tokyo Revengers - Testing")}</div>
        <div><strong>Booking Date:</strong> ${value(data, "bookingDate", "Sat Mar 07 2026")}</div>
        <div><strong>Confirmation No:</strong> ${value(data, "confirmationNumber", "9876513254652")}</div>
      </div>
    </div>

    <div style="border: 1px solid #e5e7eb; padding: 20px;">
      <h3 style="margin: 0 0 20px 0; font-size: 16px;">Other Details</h3>
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; font-weight: 700;">
        🚌 2+2 Snacks & Soft Drinks
      </div>
      <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #4b5563;">
        📍 Type FOOD
      </div>
    </div>
  `;
};

const shell = (configuration: PdfRenderConfiguration, title: string, body: string, layout: 1 | 2 | 3, mode?: "tax" | "proforma" | "cancelled" | "quotation" | "voucher") => {
  const isVoucher = mode === "voucher";
  const headerHtml = isVoucher ? `
    <header class="header">
      <div class="header-left">
        <h1>${escapeHtml(title)}</h1>
      </div>
      <div class="header-right">
        ${configuration.logo ? `<img class="logo" src="${escapeHtml(configuration.logo)}" alt="Logo" />` : ""}
      </div>
    </header>
  ` : `
    <header class="header">
      <div class="header-left">
        <h1>Skyshot Travels</h1>
        ${layout === 2 ? `<div>techwithkunnu0853@gmail.com</div><div>+919650533375</div>` : ''}
      </div>
      <div class="header-right">
        <h2>${escapeHtml(title)}</h2>
        ${layout !== 2 && configuration.logo ? `<img class="logo" src="${escapeHtml(configuration.logo)}" alt="Logo" />` : ""}
      </div>
    </header>
    ${layout !== 2 && !isVoucher ? `
    <div style="font-size: 12px; margin-top: -30px; margin-bottom: 40px;">
      <div>+919650533375</div>
      <div>techwithkunnu0853@gmail.com</div>
      <div>19th Floor, Flamingo Tower, Hauz Khas, New Delhi</div>
    </div>
    ` : ''}
  `;

  return `
<!doctype html>
<html>
  <head><meta charset="utf-8" /><style>${baseStyles(configuration, layout)}</style></head>
  <body>
    <main class="document">
      ${headerHtml}
      ${body}
    </main>
  </body>
</html>`;
};

export const renderDocumentHtml = ({ documentType, data, configuration, templateName }: RenderInput) => {
  const layoutType = determineLayoutType(templateName);
  
  if (documentType === "taxInvoice") return shell(configuration, "Tax Invoice", renderInvoiceBody(data, "tax", layoutType, configuration), layoutType, "tax");
  if (documentType === "proformaInvoice") return shell(configuration, "Proforma Invoice", renderInvoiceBody(data, "proforma", layoutType, configuration), layoutType, "proforma");
  if (documentType === "cancelledInvoice") return shell(configuration, "Tax Invoice", renderInvoiceBody(data, "cancelled", layoutType, configuration), layoutType, "cancelled");
  if (documentType === "quotation") return shell(configuration, "Quotation", renderQuotationBody(data, layoutType, configuration), layoutType, "quotation");
  if (documentType === "serviceVoucher") return shell(configuration, "Other Voucher", renderVoucherBody(data, layoutType, configuration), layoutType, "voucher");
  
  return shell(configuration, templateName, `<div class="meta-box">Unsupported document type.</div>`, layoutType);
};
