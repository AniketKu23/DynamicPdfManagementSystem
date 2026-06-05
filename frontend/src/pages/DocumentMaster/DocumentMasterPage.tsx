import { useEffect, useMemo, useRef, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { FontConfigurator } from "../../components/FontConfigurator";
import { Header } from "../../components/Header";
import { LivePreview } from "../../components/LivePreview";
import { LogoUploader } from "../../components/LogoUploader";
import { PdfPreview } from "../../components/PdfPreview";
import { Sidebar } from "../../components/Sidebar";
import { TemplateGrid } from "../../components/TemplateGrid";
import { ThemeConfigurator } from "../../components/ThemeConfigurator";
import { useConfiguration, useSaveConfiguration, useTemplates } from "../../hooks/useTemplates";
import { templateApi } from "../../services/api";
import { defaultConfiguration, useTemplateStore } from "../../store/templateStore";
import { Template, TemplateConfiguration } from "../../types";
import { builtInThemes, getFallbackThemes } from "../../utils/themeCatalog";

const importSchema = z.object({
  templateId: z.string(),
  isDefault: z.boolean(),
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  secondaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  headerFont: z.enum(["Arial", "Roboto", "Times New Roman", "Open Sans"]),
  bodyFont: z.enum(["Arial", "Roboto", "Times New Roman", "Open Sans"]),
  footerFont: z.enum(["Arial", "Roboto", "Times New Roman", "Open Sans"]),
  headerSize: z.number(),
  bodySize: z.number(),
  footerSize: z.number(),
  headerBold: z.boolean(),
  bodyBold: z.boolean(),
  footerBold: z.boolean(),
  alignment: z.enum(["left", "center", "right"]),
  logo: z.string().optional()
});

type ImportForm = z.infer<typeof importSchema>;

const getTemplateId = (configuration?: TemplateConfiguration) => {
  if (!configuration?.templateId) return "";
  return typeof configuration.templateId === "string" ? configuration.templateId : configuration.templateId._id;
};

const isMongoObjectId = (value: string) => /^[0-9a-fA-F]{24}$/.test(value);

export const DocumentMasterPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const importInputRef = useRef<HTMLInputElement>(null);
  const hasHydratedConfiguration = useRef(false);
  const queryClient = useQueryClient();

  const selectedTemplate = useTemplateStore((state) => state.selectedTemplate);
  const configuration = useTemplateStore((state) => state.configuration);
  const setSelectedTemplate = useTemplateStore((state) => state.setSelectedTemplate);
  const setConfiguration = useTemplateStore((state) => state.setConfiguration);
  const setPreviewCategory = useTemplateStore((state) => state.setPreviewCategory);

  const templatesQuery = useTemplates(search, category);
  const configurationQuery = useConfiguration();
  const saveMutation = useSaveConfiguration();

  const importForm = useForm<ImportForm>({
    resolver: zodResolver(importSchema),
    defaultValues: defaultConfiguration as ImportForm
  });

  const importMutation = useMutation({
    mutationFn: (payload: ImportForm) => templateApi.importConfiguration(payload),
    onSuccess: (saved) => {
      setConfiguration({ ...saved, templateId: getTemplateId(saved) });
      toast.success("Configuration imported");
      queryClient.invalidateQueries({ queryKey: ["configuration"] });
    },
    onError: () => toast.error("Import failed")
  });

  const reorderMutation = useMutation({
    mutationFn: templateApi.reorder,
    onSuccess: (templates) => queryClient.setQueryData(["templates", search, category], templates),
    onError: () => toast.error("Unable to save new order")
  });

  useEffect(() => {
    const apiConfig = configurationQuery.data;
    const templates = templatesQuery.data ?? [];
    if (!apiConfig || hasHydratedConfiguration.current) return;

    const templateId = getTemplateId(apiConfig);
    setConfiguration({ ...apiConfig, templateId });
    const matchingTemplate = templates.find((template) => template._id === templateId);
    if (matchingTemplate && !selectedTemplate) {
      setSelectedTemplate(matchingTemplate);
    }
    hasHydratedConfiguration.current = true;
  }, [configurationQuery.data, selectedTemplate, setConfiguration, setSelectedTemplate, templatesQuery.data]);

  const fallbackTemplates = useMemo(() => getFallbackThemes(search, category), [search, category]);
  const templates = templatesQuery.data?.length ? templatesQuery.data : fallbackTemplates;
  const defaultId = useMemo(() => getTemplateId(configuration), [configuration]);

  useEffect(() => {
    if (!templates.length) return;
    if (!selectedTemplate || !templates.some((template) => template._id === selectedTemplate._id)) {
      setSelectedTemplate(templates[0]);
    }
  }, [selectedTemplate, setSelectedTemplate, templates]);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    if (value) {
      const matchingThemes = getFallbackThemes(search, value);
      setPreviewCategory(matchingThemes[0]?.category ?? (value as Template["category"]));
      if (matchingThemes[0]) {
        setSelectedTemplate(matchingThemes[0]);
      }
    }
  };

  const handleReorder = (activeId: string, overId: string) => {
    const oldIndex = templates.findIndex((template) => template._id === activeId);
    const newIndex = templates.findIndex((template) => template._id === overId);
    if (oldIndex < 0 || newIndex < 0) return;
    const reordered = arrayMove(templates, oldIndex, newIndex);
    queryClient.setQueryData(["templates", search, category], reordered);
    if (reordered.some((template) => !isMongoObjectId(template._id))) return;
    reorderMutation.mutate(reordered.map((template) => template._id));
  };

  const handleSave = () => {
    if (!configuration.templateId) {
      toast.error("Select a template first");
      return;
    }
    const templateId = getTemplateId(configuration);
    if (!isMongoObjectId(templateId)) {
      toast.success("Theme saved locally");
      return;
    }
    saveMutation.mutate(configuration);
  };

  const handleImportFile = async (file?: File) => {
    if (!file) return;
    try {
      const json = JSON.parse(await file.text());
      const parsed = importSchema.parse({
        ...json,
        templateId: typeof json.templateId === "object" ? json.templateId._id : json.templateId
      });
      importForm.reset(parsed);
      if (!isMongoObjectId(parsed.templateId)) {
        const matchingTheme = builtInThemes.find((theme) => theme._id === parsed.templateId);
        if (matchingTheme) setSelectedTemplate(matchingTheme);
        setConfiguration(parsed);
        toast.success("Theme imported locally");
        return;
      }
      importMutation.mutate(parsed);
    } catch {
      toast.error("Invalid configuration.json");
    } finally {
      if (importInputRef.current) importInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <Header onImportClick={() => importInputRef.current?.click()} />
      <input
        ref={importInputRef}
        className="sr-only"
        type="file"
        accept="application/json"
        onChange={(event) => handleImportFile(event.target.files?.[0])}
      />
      <div className="flex">
        <Sidebar />
        <main className="grid w-full gap-6 p-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:p-6">
          <div className="space-y-6">
            <TemplateGrid
              category={category}
              defaultId={defaultId}
              loading={templatesQuery.isLoading && !fallbackTemplates.length}
              onCategory={handleCategoryChange}
              onReorder={handleReorder}
              onSearch={setSearch}
              onSelect={(template: Template) => {
                setSelectedTemplate(template);
                setConfiguration({ ...template.theme, templateId: template._id, isDefault: true });
              }}
              search={search}
              selectedId={selectedTemplate?._id}
              templates={templates}
            />
            <div className="grid gap-4 xl:grid-cols-2">
              <ThemeConfigurator />
              <FontConfigurator />
            </div>
            <LogoUploader />
            <PdfPreview />
          </div>
          <aside className="space-y-4">
            <LivePreview />
            <button
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60 dark:bg-white dark:text-slate-950"
              disabled={saveMutation.isPending}
              onClick={handleSave}
              type="button"
            >
              <Save size={17} />
              Save Configuration
            </button>
          </aside>
        </main>
      </div>
    </div>
  );
};
