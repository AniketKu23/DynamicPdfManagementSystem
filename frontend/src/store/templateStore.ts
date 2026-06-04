import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DocumentCategory, Template, TemplateConfiguration } from "../types";
import { sampleDataByCategory } from "../utils/sampleData";

type TemplateState = {
  selectedTemplate: Template | null;
  configuration: TemplateConfiguration;
  previewCategory: DocumentCategory;
  previewData: Record<string, unknown>;
  darkMode: boolean;
  setSelectedTemplate: (template: Template) => void;
  setConfiguration: (configuration: Partial<TemplateConfiguration>) => void;
  setPreviewCategory: (category: DocumentCategory) => void;
  setPreviewData: (data: Record<string, unknown>) => void;
  toggleDarkMode: () => void;
};

export const defaultConfiguration: TemplateConfiguration = {
  templateId: "",
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
  alignment: "center",
  logo: ""
};

export const useTemplateStore = create<TemplateState>()(
  persist(
    (set, get) => ({
      selectedTemplate: null,
      configuration: defaultConfiguration,
      previewCategory: "invoice",
      previewData: sampleDataByCategory.invoice,
      darkMode: false,
      setSelectedTemplate: (template) =>
        set((state) => ({
          selectedTemplate: template,
          previewCategory: template.category,
          previewData: sampleDataByCategory[template.category],
          configuration: {
            ...state.configuration,
            ...template.theme,
            templateId: template._id,
            isDefault: true
          }
        })),
      setConfiguration: (configuration) =>
        set((state) => ({
          configuration: {
            ...state.configuration,
            ...configuration
          }
        })),
      setPreviewCategory: (category) =>
        set({
          previewCategory: category,
          previewData: sampleDataByCategory[category]
        }),
      setPreviewData: (data) => set({ previewData: data }),
      toggleDarkMode: () => set({ darkMode: !get().darkMode })
    }),
    { name: "dynamic-pdf-template-state" }
  )
);
