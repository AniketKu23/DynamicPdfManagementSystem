import puppeteer from "puppeteer";
import { Template } from "../models/Template";
import { getDefaultConfiguration } from "./templateService";
import { PdfRenderConfiguration, renderDocumentHtml } from "../templates/renderHtml";
import { ApiError } from "../utils/ApiError";

type PdfBuildOptions = {
  configuration?: PdfRenderConfiguration;
  templateName?: string;
};

export const buildPdfHtml = async (documentType: string, data: Record<string, unknown>, options: PdfBuildOptions = {}) => {
  if (options.configuration) {
    return renderDocumentHtml({
      documentType,
      data,
      configuration: options.configuration,
      templateName: options.templateName ?? documentType
    });
  }

  const configuration = await getDefaultConfiguration();
  const template = await Template.findById(configuration.templateId);
  if (!template) throw new ApiError(404, "Default template no longer exists");

  return renderDocumentHtml({
    documentType,
    data,
    configuration,
    templateName: template.name
  });
};

export const generatePdfBuffer = async (documentType: string, data: Record<string, unknown>, options: PdfBuildOptions = {}) => {
  const html = await buildPdfHtml(documentType, data, options);
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    await page.evaluate(async () => {
      await Promise.all(
        Array.from(document.images).map(
          (image) =>
            image.complete ||
            new Promise<void>((resolve) => {
              image.onload = () => resolve();
              image.onerror = () => resolve();
            })
        )
      );
    });
    return Buffer.from(
      await page.pdf({
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true
      })
    );
  } finally {
    await browser.close();
  }
};
