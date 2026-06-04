import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { buildPdfHtml, generatePdfBuffer } from "../services/pdfService";

export const previewPdf = asyncHandler(async (req: Request, res: Response) => {
  const html = await buildPdfHtml(req.body.documentType, req.body.data, {
    configuration: req.body.configuration,
    templateName: req.body.templateName
  });
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
});

export const generatePdf = asyncHandler(async (req: Request, res: Response) => {
  const buffer = await generatePdfBuffer(req.body.documentType, req.body.data, {
    configuration: req.body.configuration,
    templateName: req.body.templateName
  });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=generated-document.pdf");
  res.status(200).send(buffer);
});

export const downloadPdf = asyncHandler(async (req: Request, res: Response) => {
  const buffer = await generatePdfBuffer(req.body.documentType, req.body.data, {
    configuration: req.body.configuration,
    templateName: req.body.templateName
  });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=generated-document.pdf");
  res.status(200).send(buffer);
});
