import { Schema, model, InferSchemaType, Types } from "mongoose";

const templateConfigurationSchema = new Schema(
  {
    templateId: { type: Schema.Types.ObjectId, ref: "Template", required: true },
    isDefault: { type: Boolean, default: false },
    primaryColor: { type: String, required: true, default: "#0d6efd" },
    secondaryColor: { type: String, required: true, default: "#198754" },
    headerFont: { type: String, required: true, default: "Roboto" },
    bodyFont: { type: String, required: true, default: "Arial" },
    footerFont: { type: String, required: true, default: "Open Sans" },
    headerSize: { type: Number, required: true, default: 24 },
    bodySize: { type: Number, required: true, default: 14 },
    footerSize: { type: Number, required: true, default: 12 },
    headerBold: { type: Boolean, default: true },
    bodyBold: { type: Boolean, default: false },
    footerBold: { type: Boolean, default: false },
    alignment: { type: String, enum: ["left", "center", "right"], default: "center" },
    logo: { type: String, default: "" }
  },
  { timestamps: true }
);

templateConfigurationSchema.index({ templateId: 1 }, { unique: true });
templateConfigurationSchema.index({ isDefault: 1 });

export type TemplateConfigurationDocument = InferSchemaType<typeof templateConfigurationSchema> & {
  templateId: Types.ObjectId;
};

export const TemplateConfiguration = model("TemplateConfiguration", templateConfigurationSchema);
