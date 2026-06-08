import { Types } from "mongoose";
import { Template } from "../models/Template";
import { TemplateConfiguration } from "../models/TemplateConfiguration";
import { ApiError } from "../utils/ApiError";

export const getDefaultConfiguration = async () => {
  const configuration = await TemplateConfiguration.findOne({ isDefault: true }).populate("templateId");
  if (configuration) return configuration;

  const template = await Template.findOne({ isActive: true }).sort({ order: 1, createdAt: 1 });
  if (!template) throw new ApiError(404, "No active template found");

  return TemplateConfiguration.create({
    templateId: template._id,
    isDefault: true,
    primaryColor: "#0d6efd",
    secondaryColor: "#198754",
    headerFont: "Roboto",
    bodyFont: "Arial",
    footerFont: "Open Sans",
    headerSize: 24,
    bodySize: 14,
    footerSize: 12,
    headerBold: true,
    bodyBold: false,
    footerBold: false,
    alignment: "center"
  });
};

export const saveConfiguration = async (payload: Record<string, unknown>) => {
  const template = await Template.findById(payload.templateId);
  if (!template) throw new ApiError(404, "Template not found");

  if (payload.isDefault) {
    const templateIdsInCategory = await Template.find({ category: template.category }).distinct('_id');
    await TemplateConfiguration.updateMany({ templateId: { $in: templateIdsInCategory } }, { $set: { isDefault: false } });
  }

  const configuration = await TemplateConfiguration.findOneAndUpdate(
    { templateId: new Types.ObjectId(String(payload.templateId)) },
    { $set: payload },
    { new: true, upsert: true, runValidators: true }
  );

  return configuration.populate("templateId");
};

export const exportConfiguration = async () => {
  const configuration = await getDefaultConfiguration();
  return configuration.toObject();
};
