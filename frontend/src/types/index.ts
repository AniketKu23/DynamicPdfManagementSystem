export type DocumentCategory = "invoice" | "voucher" | "booking" | "quotation" | "report";
export type FontFamily = "Arial" | "Roboto" | "Times New Roman" | "Open Sans";
export type Alignment = "left" | "center" | "right";

export type Template = {
  _id: string;
  name: string;
  thumbnail: string;
  description: string;
  category: DocumentCategory;
  isActive: boolean;
  order?: number;
  theme?: Partial<Omit<TemplateConfiguration, "_id" | "templateId" | "isDefault">>;
};

export type TemplateConfiguration = {
  _id?: string;
  templateId: string | Template;
  isDefault: boolean;
  primaryColor: string;
  secondaryColor: string;
  headerFont: FontFamily;
  bodyFont: FontFamily;
  footerFont: FontFamily;
  headerSize: number;
  bodySize: number;
  footerSize: number;
  headerBold: boolean;
  bodyBold: boolean;
  footerBold: boolean;
  alignment: Alignment;
  logo?: string;
};

export type PdfRequest = {
  documentType: DocumentCategory;
  data: Record<string, unknown>;
  configuration?: Omit<TemplateConfiguration, "_id" | "templateId" | "isDefault">;
  templateName?: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
