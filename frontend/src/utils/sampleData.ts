import { DocumentCategory } from "../types";

export const categories: Array<{ value: DocumentCategory | ""; label: string }> = [
  { value: "", label: "All" },
  { value: "taxInvoice", label: "Tax Invoice" },
  { value: "proformaInvoice", label: "Proforma Invoice" },
  { value: "cancelledInvoice", label: "Cancelled Invoice" },
  { value: "quotation", label: "Quotation" },
  { value: "serviceVoucher", label: "Service Voucher" }
];

export const sampleDataByCategory: Record<DocumentCategory, Record<string, unknown>> = {
  taxInvoice: {
    companyName: "Skyshot Travels",
    documentTitle: "Tax Invoice",
    customerName: "Mr. Anurag Singh Chauhan",
    customerEmail: "anurag@gmail.com",
    customerCity: "New Delhi",
    invoiceNumber: "INV0002",
    invoiceDate: "Thu Mar 05 2026",
    packageName: "Tokyo Revengers - Testing (1 Adults)",
    travelDates: "Thu Mar 05 2026 - Sun Mar 08 2026 (3 Nights / 4 Days)",
    subtotal: "877450.00",
    gst: "43872.50",
    total: "921322.50",
    contactEmail: "techwithkunnu0853@gmail.com",
    contactPhone: "+919650533375"
  },
  proformaInvoice: {
    companyName: "Skyshot Travels",
    documentTitle: "Proforma Invoice",
    customerName: "Mr. Anurag Singh Chauhan",
    customerPhone: "+919482789893",
    customerCity: "New Delhi",
    documentDate: "Sat Jun 06 2026",
    packageName: "Tokyo Revengers - Testing (1 Adults)",
    travelDates: "Thu Mar 05 2026 - Sun Mar 08 2026 (3 Nights / 4 Days)",
    subtotal: "877450",
    gst: "43872.5",
    total: "921322.5"
  },
  cancelledInvoice: {
    companyName: "Skyshot Travels",
    documentTitle: "Tax Invoice",
    customerName: "Mr. Anurag Singh Chauhan",
    customerEmail: "anurag@gmail.com",
    customerCity: "New Delhi",
    invoiceNumber: "INV0001",
    invoiceDate: "Mon Mar 02 2026",
    status: "CANCELLED"
  },
  quotation: {
    title: "Tokyo Revengers - Testing",
    destinations: "Higashi-osaka, Tokyo",
    quoteReference: "Tokyo Revengers - Testing",
    quoteDate: "Thu Mar 05 2026",
    enquiryId: "SKTR-000001",
    customerName: "Mr. Anurag Singh Chauhan",
    email: "anurag@gmail.com",
    phone: "+919482789893",
    guests: "1",
    itineraryDay: "Thu Mar 05 2026 / Trip Start Day (Day 1)",
    flightSummary: "DEL - BKK - HKG - NRT / Round Trip",
    transferSummary: "Hotel-to-point transfer with Bharat Benz and Xuv700 vehicles",
    hotelSummary: "The Leela Ambience Convention, New Delhi",
    sightseeingSummary: "Kedarnath Temple and Desert Safari"
  },
  serviceVoucher: {
    customerName: "Mr. Anurag Singh Chauhan",
    phone: "+919482789893",
    email: "anurag@gmail.com",
    bookingReference: "Tokyo Revengers - Testing",
    bookingDate: "Fri Mar 06 2026",
    confirmationNumber: "8978462897894",
    serviceTitle: "Hotel Voucher",
    serviceType: "Hotel Detail",
    primaryDetail: "The Leela Ambience Convention",
    secondaryDetail: "Check-in Fri Mar 06 2026, Check-out Sat Mar 07 2026",
    guestDetail: "3 X DELUXE (AI) | 6 Adults; 5 X SUPERIOR (AI) | 10 Adults",
    contactEmail: "techwithkunnu0853@gmail.com",
    contactPhone: "+919650533375",
    contactCity: "New Delhi"
  }
};
