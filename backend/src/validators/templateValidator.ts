import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");
const color = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Use a hex color like #0d6efd");
const font = z.enum(["Arial", "Roboto", "Times New Roman", "Open Sans"]);
const alignment = z.enum(["left", "center", "right"]);
const category = z.enum(["invoice", "voucher", "booking", "quotation", "report"]);

const templateTheme = z
  .object({
    primaryColor: color.optional(),
    secondaryColor: color.optional(),
    headerFont: font.optional(),
    bodyFont: font.optional(),
    footerFont: font.optional(),
    headerSize: z.number().int().min(10).max(48).optional(),
    bodySize: z.number().int().min(8).max(28).optional(),
    footerSize: z.number().int().min(8).max(24).optional(),
    headerBold: z.boolean().optional(),
    bodyBold: z.boolean().optional(),
    footerBold: z.boolean().optional(),
    alignment: alignment.optional()
  })
  .optional();

export const templateCreateSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    thumbnail: z.string().min(1),
    description: z.string().min(5),
    category,
    isActive: z.boolean().optional(),
    theme: templateTheme,
    order: z.number().int().min(0).optional()
  })
});

export const templateUpdateSchema = z.object({
  params: z.object({ id: objectId }),
  body: templateCreateSchema.shape.body.partial()
});

export const idParamSchema = z.object({
  params: z.object({ id: objectId })
});

export const saveConfigurationSchema = z.object({
  body: z.object({
    templateId: objectId,
    isDefault: z.boolean().default(true),
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
  })
});

export const importConfigurationSchema = z.object({
  body: saveConfigurationSchema.shape.body
});

export const reorderTemplatesSchema = z.object({
  body: z.object({
    templateIds: z.array(objectId).min(1)
  })
});
