import { z } from "zod";

const color = z.string().regex(/^#[0-9a-fA-F]{6}$/);
const font = z.enum(["Arial", "Roboto", "Times New Roman", "Open Sans"]);
const alignment = z.enum(["left", "center", "right"]);

const pdfConfigurationSchema = z.object({
  primaryColor: color,
  secondaryColor: color,
  headerFont: font,
  bodyFont: font,
  footerFont: font,
  headerSize: z.number().int().min(10).max(48),
  bodySize: z.number().int().min(8).max(28),
  footerSize: z.number().int().min(8).max(24),
  headerBold: z.boolean(),
  bodyBold: z.boolean(),
  footerBold: z.boolean(),
  alignment,
  logo: z.string().optional().default("")
});

export const pdfRequestSchema = z.object({
  body: z.object({
    documentType: z.enum(["invoice", "voucher", "booking", "quotation", "report"]),
    data: z.record(z.unknown()).default({}),
    configuration: pdfConfigurationSchema.optional(),
    templateName: z.string().min(1).max(120).optional()
  })
});
