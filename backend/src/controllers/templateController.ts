import { Request, Response } from "express";
import { Template } from "../models/Template";
import { TemplateConfiguration } from "../models/TemplateConfiguration";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/responses";
import { ApiError } from "../utils/ApiError";
import { exportConfiguration, getDefaultConfiguration, saveConfiguration } from "../services/templateService";

export const getTemplates = asyncHandler(async (req: Request, res: Response) => {
  const { search = "", category = "" } = req.query as Record<string, string>;
  const filter: Record<string, unknown> = {};
  if (category) filter.category = category;
  if (search) filter.name = { $regex: search, $options: "i" };

  const templates = await Template.find(filter).sort({ order: 1, createdAt: 1 });
  sendSuccess(res, templates);
});

export const getTemplateById = asyncHandler(async (req: Request, res: Response) => {
  const template = await Template.findById(req.params.id);
  if (!template) throw new ApiError(404, "Template not found");
  sendSuccess(res, template);
});

export const createTemplate = asyncHandler(async (req: Request, res: Response) => {
  const template = await Template.create(req.body);
  sendSuccess(res, template, "Template created", 201);
});

export const updateTemplate = asyncHandler(async (req: Request, res: Response) => {
  const template = await Template.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!template) throw new ApiError(404, "Template not found");
  sendSuccess(res, template, "Template updated");
});

export const deleteTemplate = asyncHandler(async (req: Request, res: Response) => {
  const template = await Template.findByIdAndDelete(req.params.id);
  if (!template) throw new ApiError(404, "Template not found");
  await TemplateConfiguration.deleteOne({ templateId: template._id });
  sendSuccess(res, template, "Template deleted");
});

export const getDefaultTemplate = asyncHandler(async (_req: Request, res: Response) => {
  const configuration = await getDefaultConfiguration();
  sendSuccess(res, configuration, "Default template configuration");
});

export const saveTemplateConfiguration = asyncHandler(async (req: Request, res: Response) => {
  const configuration = await saveConfiguration(req.body);
  sendSuccess(res, configuration, "Configuration saved");
});

export const getConfiguration = asyncHandler(async (_req: Request, res: Response) => {
  const configuration = await getDefaultConfiguration();
  sendSuccess(res, configuration);
});

export const getConfigurationByTemplate = asyncHandler(async (req: Request, res: Response) => {
  const configuration = await TemplateConfiguration.findOne({ templateId: req.params.id }).populate("templateId");
  sendSuccess(res, configuration);
});

export const exportTemplateConfiguration = asyncHandler(async (_req: Request, res: Response) => {
  const configuration = await exportConfiguration();
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Disposition", "attachment; filename=configuration.json");
  res.status(200).json(configuration);
});

export const importTemplateConfiguration = asyncHandler(async (req: Request, res: Response) => {
  const configuration = await saveConfiguration(req.body);
  sendSuccess(res, configuration, "Configuration imported");
});

export const reorderTemplates = asyncHandler(async (req: Request, res: Response) => {
  await Promise.all(
    (req.body.templateIds as string[]).map((id, index) =>
      Template.findByIdAndUpdate(id, { $set: { order: index } })
    )
  );
  const templates = await Template.find().sort({ order: 1, createdAt: 1 });
  sendSuccess(res, templates, "Templates reordered");
});
