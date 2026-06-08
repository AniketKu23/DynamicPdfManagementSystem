import { Template } from "../src/models/Template";
import { TemplateConfiguration } from "../src/models/TemplateConfiguration";

export const createTemplateFixture = async () => {
  const template = await Template.create({
    name: "Corporate Invoice",
    thumbnail: "data:image/svg+xml,test",
    description: "Enterprise-ready invoice layout.",
    category: "taxInvoice",
    isActive: true
  });

  const configuration = await TemplateConfiguration.create({
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

  return { template, configuration };
};
