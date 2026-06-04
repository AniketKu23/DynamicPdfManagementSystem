import { DocumentCategory } from "../types";

export const categories: Array<{ value: DocumentCategory | ""; label: string }> = [
  { value: "", label: "All" },
  { value: "invoice", label: "Invoice" },
  { value: "voucher", label: "Voucher" },
  { value: "booking", label: "Booking" },
  { value: "quotation", label: "Quotation" },
  { value: "report", label: "Report" }
];

export const sampleDataByCategory: Record<DocumentCategory, Record<string, unknown>> = {
  invoice: { invoiceNumber: "INV001", customerName: "John Doe", amount: 1500, dueDate: "2026-06-30" },
  voucher: { voucherNumber: "TRV204", passengerName: "John Doe", destination: "Singapore", amount: 875 },
  booking: { bookingId: "BK1029", guestName: "John Doe", checkIn: "2026-07-10", checkOut: "2026-07-14" },
  quotation: { quoteNumber: "QT7781", customerName: "John Doe", validUntil: "2026-07-01", amount: 2450 },
  report: { reportTitle: "Quarterly Operations Report", author: "Admin Team", period: "Q2 2026", score: "92%" }
};
