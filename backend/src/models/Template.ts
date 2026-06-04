import { Schema, model, InferSchemaType } from "mongoose";

const templateSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["invoice", "voucher", "booking", "quotation", "report"]
    },
    isActive: { type: Boolean, default: true },
    theme: {
      primaryColor: String,
      secondaryColor: String,
      headerFont: String,
      bodyFont: String,
      footerFont: String,
      headerSize: Number,
      bodySize: Number,
      footerSize: Number,
      headerBold: Boolean,
      bodyBold: Boolean,
      footerBold: Boolean,
      alignment: String
    },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

templateSchema.index({ category: 1, isActive: 1 });

export type TemplateDocument = InferSchemaType<typeof templateSchema>;
export const Template = model("Template", templateSchema);
